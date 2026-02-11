import Users from "@/app/admin/models/Users";
import bcrypt from "bcryptjs";

export async function createDefaultAdmin() {
  try {
    const email = (process.env.DEFAULT_ADMIN_EMAIL || "admin@admin.com").toLowerCase();

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      // If user exists but not admin → promote without triggering validation
      if (existingUser.role !== "admin") {
        await Users.updateOne(
          { email },
          { $set: { role: "admin" } }
        );
        console.log("🔄 Existing user promoted to admin");
      } else {
        console.log("✅ Default admin already exists");
      }
      return;
    }

    // Create admin if not exists
    const hashedPassword = await bcrypt.hash(
      process.env.DEFAULT_ADMIN_PASSWORD || "admin123",
      10
    );

    await Users.create({
      username: "Super Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("🔥 Default admin user created");

  } catch (error) {
    console.error("❌ Failed to create default admin:", error);
  }
}
