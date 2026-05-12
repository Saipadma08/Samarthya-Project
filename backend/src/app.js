const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const employeeRoutes = require("./routes/employee.routes");
const employerRoutes = require("./routes/employer.routes");
const adminRoutes = require("./routes/admin.routes");

const complaintRoutes = require("./routes/complaint.routes");
const connectionRoutes = require("./routes/connection.routes");
const messageRoutes = require("./routes/message.routes");
const settingsRoutes = require("./routes/settings.routes");

const notificationRoutes = require("./routes/notification.routes");
const searchRoutes = require("./routes/search.routes");

const postedJobRoutes = require("./routes/postedJob.routes");
const applicationRoutes = require("./routes/application.routes");

const app = express();


//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/api/auth', authRoutes)
app.use("/api/employee", employeeRoutes);
app.use("/api/employer", employerRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/complaints", complaintRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/settings", settingsRoutes);

app.use("/api/notification", notificationRoutes);
app.use("/api/search", searchRoutes);

app.use("/api/postedjobs", postedJobRoutes); 
app.use("/api/applications",applicationRoutes);

module.exports = app;