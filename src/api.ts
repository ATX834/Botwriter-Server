import "reflect-metadata";
import path from "path";
import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { SampleCoverLetterResolver } from "./resolvers/SampleCoverLetterResolver";
import { config } from "./config/config";
import bcrypt from "bcryptjs"

export async function bootstrap() {
  await createConnection({
    type: config.server as "mysql",
    url: `${config.server}://${config.db_uname}:${config.db_password}@${config.host}/${config.db}`,
    entities: [path.resolve(__dirname,'./models/*.{ts,js}')],
    synchronize: true,
  });

  const schema = await buildSchema({
    resolvers: [UserResolver, SampleCoverLetterResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(config.port);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
  let hash = await bcrypt.hash("lololol", bcrypt.genSaltSync(14));
  console.log(hash)
}

bootstrap();
