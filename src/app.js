const express  = require("express");
const app = express();
const PORT = 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend running");
});
app.listen(PORT,()=>{
    console.log("Server running on port 5000")
    console.log("http://localhost:5000")
})
module.exports = app;