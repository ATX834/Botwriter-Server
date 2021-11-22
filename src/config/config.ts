// import express from "express";
import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../resolvers/UserResolver";
import { SampleCoverLetterResolver } from "../resolvers/SampleCoverLetterResolver";

// import { User } from "../models/User";
// import { SampleCoverLetter } from "../models/SampleCoverLetter";
// import { Variable } from "../models/Variable";

// export const app = express()

const DB_SERVER = "mysql";
const DB_PORT = 3306;
const DB_HOST = "localhost";
const DATABASE = "genLDM";
const DB_UNAME = "root";
const DB_PASSWORD = "password";
const APOLLO_PORT = 4000;
export async function bootstrap() {
  await createConnection({
    type: DB_SERVER,
    url: `${DB_SERVER}://${DB_UNAME}:${DB_PASSWORD}@${DB_HOST}/${DATABASE}`,
    entities: ["models/*.js"],
  });

  const schema = await buildSchema({
    resolvers: [UserResolver, SampleCoverLetterResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(APOLLO_PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}
