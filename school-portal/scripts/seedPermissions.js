// scripts/seedPermissions.js
require("dotenv").config(); // 
const mongoose = require("mongoose");
const Permission = require("../models/Permission");

async function runSeed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DATABASE_NAME,
    });
    console.log("📌 Connected to MongoDB");

    await Permission.insertMany([
      { name: "create_student", label: "Create Student", module: "student" },
      { name: "view_student", label: "View Student", module: "student" },
      { name: "update_student", label: "Update Student", module: "student" },
      { name: "delete_student", label: "Delete Student", module: "student" },

      { name: "mark_attendance", label: "Mark Attendance", module: "attendance" },
      { name: "view_attendance", label: "View Attendance", module: "attendance" },

      { name: "create_grade", label: "Create Grade", module: "grade" },
      { name: "view_grade", label: "View Grade", module: "grade" },
      { name: "update_grade", label: "Update Grade", module: "grade" },
      { name: "delete_grade", label: "Delete Grade", module: "grade" },
    ]);

    console.log("🎉 Permissions Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding:", error);
    process.exit(1);
  }
}

runSeed();
