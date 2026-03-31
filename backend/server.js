const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());



app.get("/", (req, res) =>{
    res.send("Server is running");
});

app.get("/groomers", (req, res) =>{
    db.all("SELECT * FROM groomers", (err, rows) => {
    res.json(rows);
  });
});

app.get("/bookings", (req,res) =>{
    res.json(bookings);
});

app.post("/booking", (req,res) => {
    const {dogName, time, groomerID} = req.body;

    if (!dogName || !time || !groomerID ){
        return res.status(400).json({error: "Input required"});
    }

    db.get(
    "SELECT * FROM bookings WHERE time = ? AND groomerId = ?",
    [time, groomerId],
    (err, row) => {
      if (row) {
        return res.status(400).json({ error: "Time slot already taken" });
      }

      db.run(
        "INSERT INTO bookings (dogName, time, groomerId) VALUES (?, ?, ?)",
        [dogName, time, groomerId],
        function (err) {
          res.json({ success: true, id: this.lastID });
        }
      );
    }
  );

});

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


app.get("/bookings", (req, res) => {
  db.all("SELECT * FROM bookings", (err, rows) => {
    res.json(rows);
  });
});

app.listen(3000, () => console.log("server running on http://localhost:3000"))