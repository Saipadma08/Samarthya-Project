const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const employeeRoutes = require("./routes/employee.routes");
const employerRoutes = require("./routes/employer.routes");
const adminRoutes = require("./routes/admin.routes");

const contactRoutes = require("./routes/contact.routes");

const complaintRoutes = require("./routes/complaint.routes");
const connectionRoutes = require("./routes/connection.routes");
const messageRoutes = require("./routes/message.routes");
const settingsRoutes = require("./routes/settings.routes");

const notificationRoutes = require("./routes/notification.routes");
const searchRoutes = require("./routes/search.routes");

const postedJobRoutes = require("./routes/postedJob.routes");
const applicationRoutes = require("./routes/application.routes");
const profileRoutes = require("./routes/profile.routes");

const blockRoutes= require("./routes/block.routes");
const savedJobRoutes = require("./routes/savedJob.routes");

const feedPostRoutes = require("./routes/feedPost.routes");

const app = express();


//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/api/auth', authRoutes)
app.use("/api/contact", contactRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/employer", employerRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/complaints", complaintRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/settings", settingsRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/postedjobs", postedJobRoutes); 
app.use("/api/applications",applicationRoutes);
app.use("/api/profile", profileRoutes);

app.use("/api/search", searchRoutes);

app.use("/api/block", blockRoutes);
app.use("/api/savedjobs", savedJobRoutes);

app.use("/api/feed-posts", feedPostRoutes);

module.exports = app;