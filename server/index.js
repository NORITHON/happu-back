const express = require('express')
const loginRouter = require('./login.js');

const app = express();
app.use(express.json())

app.use("/login", loginRouter)

app.get("", (req, res) => {
  res.send("Hello Express!");
})

app.listen(8080, () => console.log("Server is listening on 8080 port..."));