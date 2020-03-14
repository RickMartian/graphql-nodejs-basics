const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
    info: String!
}
`

const resolvers = {
    Query: {
        info: () => "That's one info"
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

const options = {
    port: 4000,
    endpoint: '/graphql'
}

server.start(options, ({ port, endpoint }) => console.log(`Server is running at http://localhost:${port}${endpoint}!`))