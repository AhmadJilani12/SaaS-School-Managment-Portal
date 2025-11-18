import mongoose from "mongoose";
import Permission from "../models/Permission.js";

const MONGO_URI = process.env.MONGO_URI;

const run = async () => {
  await mongoose.connect(MONGO_URI);

await Permission.insertMany([
  // Student Module
  { name: "create_student", label: "Create Student", module: "student" },
  { name: "view_student", label: "View Student", module: "student" },
  { name: "update_student", label: "Update Student", module: "student" },
  { name: "delete_student", label: "Delete Student", module: "student" },

  // Attendance Module
  { name: "mark_attendance", label: "Mark Attendance", module: "attendance" },
  { name: "view_attendance", label: "View Attendance", module: "attendance" },

  // ⭐ Grades Module (NEW)
  { name: "create_grade", label: "Create Grade", module: "grade" },
  { name: "view_grade", label: "View Grade", module: "grade" },
  { name: "update_grade", label: "Update Grade", module: "grade" },
  { name: "delete_grade", label: "Delete Grade", module: "grade" },
]);

  console.log("Permissions Seeded!");
  process.exit();
};

run();
