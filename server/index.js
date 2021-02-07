const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use("/auth", require("./routes/user.js"));
const PORT = process.env.PORT || 5000;

db.connect(
  "mongodb+srv://daman:1234@cluster0.cof6e.mongodb.net/auth?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
).then(() => {
  console.log("Connected");
});
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
