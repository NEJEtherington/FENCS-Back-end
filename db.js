const { cn } = require("./cn");
const pgp = require("pg-promise")();
const db = pgp(cn);
exports.db = db;
