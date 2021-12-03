"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = __importDefault(require("./api/schema"));
const resolvers_1 = __importDefault(require("./api/resolvers"));
const track_db_1 = __importDefault(require("./api/datasources/track-db"));
/* knex config object */
const knexConfig = require("./knexfile");
const environment = process.env.DB_ENV || "development";
/* initialize server */
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    dataSources: () => ({ db: new track_db_1.default(knexConfig[environment]) }),
});
/* give server access */
server.listen({ port: process.env.PORT || 4000 }).then(({ port, url }) => {
    const isDevEnviroment = !process.env.PORT;
    if (isDevEnviroment)
        console.log(`
    🚀  Server is running!
    🔉  Listening on port ${port}
    📭  Query at https://studio.apollographql.com/dev or ${url}
    `);
});
