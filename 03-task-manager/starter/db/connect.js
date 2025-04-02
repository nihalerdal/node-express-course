const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://nihal:<db_password>@nodeexpressprojects.wsbobwd.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority&appName=NodeExpressProjects";

const connectDB = (url) => {
  mongoose.connect(connectionString);
};

module.exports = connectDB