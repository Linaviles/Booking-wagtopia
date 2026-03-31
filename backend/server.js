const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

// root
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// get groomers
app.get("/groomers", (req, res) => {
  db.all("SELECT * FROM groomers", (err, rows) => {
    res.json(rows);
  });
});

// create booking
app.post("/bookings", (req, res) => {
  const { parentName, dogName, service, time, groomerId } = req.body;

  if (!parentName || !dogName || !service || !time || !groomerId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.get(
    "SELECT * FROM bookings WHERE time = ? AND groomerId = ?",
    [time, groomerId],
    (err, row) => {
      if (row) {
        return res.status(400).json({ error: "Time slot already taken" });
      }

      db.run(
        `INSERT INTO bookings (parentName, dogName, service, time, groomerId)
         VALUES (?, ?, ?, ?, ?)`,
        [parentName, dogName, service, time, groomerId],
        function () {
          res.json({ success: true });
        }
      );
    }
  );
});

// groomer schedule
app.get("/groomers/:id/bookings", (req, res) => {
  const groomerId = req.params.id;

  db.all(
    `SELECT bookings.*, groomers.name as groomerName
     FROM bookings
     JOIN groomers ON bookings.groomerId = groomers.id
     WHERE groomerId = ?
     ORDER BY time`,
    [groomerId],
    (err, rows) => {
      res.json(rows);
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});