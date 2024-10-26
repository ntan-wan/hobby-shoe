import "dotenv/config";
import { Options } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { PostgreSqlDriver, defineConfig } from "@mikro-orm/postgresql";
import { SeedManager } from "@mikro-orm/seeder";
import { Product } from "@/entities/product.entity";

const config: Options = defineConfig({
    dbName: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    driver: PostgreSqlDriver,
    // port: parseInt(process.env.DB_PORT ?? "3306"),
    pool: {
        min: 1,
        max: 10,
    },
    driverOptions: {
        connection: { ssl: true },
    },
    entities: [Product],
    extensions: [Migrator, SeedManager],
});


export default config;
