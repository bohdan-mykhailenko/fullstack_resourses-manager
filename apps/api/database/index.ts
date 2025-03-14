import { SQLDatabase } from "encore.dev/storage/sqldb";

export const db = new SQLDatabase("resource_center", {
  migrations: "./migrations",
});
