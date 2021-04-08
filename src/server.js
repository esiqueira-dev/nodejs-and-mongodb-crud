require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import routes from './routes';

mongoose.connect(process.env.MONGO_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const app = express();

app.use(express.json());
app.use(routes)

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
