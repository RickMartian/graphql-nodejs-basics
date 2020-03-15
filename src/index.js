const { GraphQLServer } = require("graphql-yoga");

let links = [
    {
        id: "link-0",
        url: "www.howtographql.com",
        description: "Fullstack tutorial for GraphQL!"
    },
    {
        id: "link-1",
        url: "www.google.com.br",
        description: "Goes to google!!"
    }
]

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => "That's one info",
        feed: () => links
    },
    Mutation: {
        createLink: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link);
            return link;
        },
        updateLink: (parent, args) => {
            const foundedLinkId = links.map(link => link.id).indexOf(args.id);
            if (foundedLinkId !== -1) {
                links[foundedLinkId] = {
                    ...links[foundedLinkId],
                    url: args.url ? args.url : links[foundedLinkId].url,
                    description: args.description ? args.description : links[foundedLinkId].description
                };
                return links[foundedLinkId];
            }
        },
        deleteLink: (parent, args) => {
            const foundedLinkId = links.map(link => link.id).indexOf(args.id);
            if (foundedLinkId !== -1) {
                linkToRemove = links[foundedLinkId];
                links = links.filter(link => link.id !== args.id);
                return linkToRemove;
            }
        }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

const options = {
    port: 7777,
}

server.start(options, ({ port }) => console.log(`Server is running at http://localhost:${port}`))