import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
import mailRoutes from "./routes/mail.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Cold Mailer Server is running");
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
