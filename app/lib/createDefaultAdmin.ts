import Users from "@/app/admin/models/Users";
import bcrypt from "bcryptjs";

/**
 * Create a default admin user if none exists.
 * Uses environment variables DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD.
 */
export async function createDefaultAdmin() {
  try {
    // Check if an admin already exists
    const adminExists = await Users.findOne({ role: "admin" });
    if (adminExists) {
      console.log("✅ Default admin already exists");
      return;
    }

    // Hash the default password
    const hashedPassword = await bcrypt.hash(
      process.env.DEFAULT_ADMIN_PASSWORD || "admin123",
      10
    );

    // Create the admin user
    const adminUser = await Users.create({
      username: "Super Admin", // lowercase to match schema
      email: (process.env.DEFAULT_ADMIN_EMAIL || "admin@admin.com").toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    console.log(`🔥 Default admin user created: ${adminUser.email}`);
  } catch (error) {
    console.error("❌ Failed to create default admin:", error);
  }
}
