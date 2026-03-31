const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./wagtopia.dp");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS groomers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      parentName TEXT,
      dogName TEXT,
      service TEXT,
      time TEXT,
      groomerId INTEGER,
      FOREIGN KEY (groomerId) REFERENCES groomers(id)
    )
  `);

  // seed groomers (only if empty)
  db.get("SELECT COUNT(*) as count FROM groomers", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO groomers (name) VALUES ('Alice')");
      db.run("INSERT INTO groomers (name) VALUES ('Bob')");
    }
  });
});

module.exports = db;