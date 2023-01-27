const express = require('express')
const loginRouter = require('./login.js');
const reservationRouter = require('./reservation.js');
const activityRouter = require('./activity.js');

const app = express();
app.use(express.json())

app.use("/login", loginRouter)
app.use("/reservation", reservationRouter);
app.use("/activity", activityRouter);

app.get("", (req, res) => {
  res.send("Hello Express!");
})

app.listen(8080, () => console.log("Server is listening on 8080 port..."));