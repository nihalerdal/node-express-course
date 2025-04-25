const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();

const authRouter = require("./routes/authRoutes");

//middleware
app.use(express.json());
app.use("/api/v1", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening port ${port}`);
});
