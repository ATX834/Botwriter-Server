// Need timers to log elasped time when starting server
console.time("Import processing time");

import "reflect-metadata";
import path from "path";
import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { SampleLetterResolver } from "./resolvers/SampleLetterResolver";
import { config } from "./config/config";
import { HookResolver } from "./resolvers/HookResolver";

console.timeEnd("Import processing time");


export async function bootstrap() {
  await createConnection({
    type: config.server as "mysql",
    url: `${config.server}://${config.db_uname}:${config.db_password}@${config.host}/${config.db}`,
    entities: [path.resolve(__dirname, './models/*.{ts,js}')],
    synchronize: true,
    // logging: ["query"] /* Uncomment to log SQL query in server logs */
  });
  
  const schema = await buildSchema({
    resolvers: [UserResolver, SampleLetterResolver, HookResolver],
  });

  const server = new ApolloServer({
    schema,
  });
  
  const { url } = await server.listen(config.port);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

console.time("Server bootstraping time");
bootstrap();
console.timeEnd("Server bootstraping time");

