import Users from "@/app/admin/models/Users";
import bcrypt from "bcryptjs";

export async function createDefaultAdmin() {
  const adminExists = await Users.findOne({ role: "Admin" });

  if (adminExists) {
    console.log("✅ Default admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(
    process.env.DEFAULT_ADMIN_PASSWORD || "admin123",
    10
  );

  await Users.create({
    Username: "Super Admin",
    email: process.env.DEFAULT_ADMIN_EMAIL || "admin@admin.com",
    password: hashedPassword,
    role: "Admin",
  });

  console.log("🔥 Default admin user created");
}
