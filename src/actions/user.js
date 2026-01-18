// app/actions/userActions.js
"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function registerUser(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role") || "user"; // Defaults to user

  await dbConnect();

  // 1. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: "User already exists" };
  }

  // 2. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  try {
    await User.create({
      name: name || "",
      email,
      password: hashedPassword,
      role,
    });
  } catch (err) {
    return { error: "Something went wrong during registration" };
  }

  redirect("/login");
}

// ────────────────────────────────────────────────
//          ADD USER (admin version - can set name, etc.)
// ────────────────────────────────────────────────
export async function addUser(formData) {
  const { name, email, role, password } = formData;

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  await dbConnect();

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return { success: false, error: "Email already in use" };
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashed,
      role,
      name: name || undefined,
    });

    revalidatePath("/admin/users");
    return { success: true, message: "User created successfully" };
  } catch (err) {
    console.error("Add user error:", err);
    return { success: false, error: "Failed to add user" };
  }
}

// ────────────────────────────────────────────────
//                UPDATE USER
// ────────────────────────────────────────────────
export async function updateUser(userId, formData) {
  const { name, email, role, password } = formData;

  if (!userId) {
    return { success: false, error: "User ID is required" };
  }

  await dbConnect();

  try {
    const updateData = {};

    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (name) updateData.name = name;

    if (password && password.trim()) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Prevent updating to existing email (if changed)
    if (email) {
      const duplicate = await User.findOne({
        email,
        _id: { $ne: userId },
      }).lean();
      if (duplicate) {
        return {
          success: false,
          error: "Email already in use by another user",
        };
      }
    }

    const updated = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) {
      return { success: false, error: "User not found" };
    }

    revalidatePath("/admin/users");
    return { success: true, message: "User updated successfully" };
  } catch (err) {
    console.error("Update user error:", err);
    return { success: false, error: "Failed to update user" };
  }
}

// ────────────────────────────────────────────────
//                DELETE USER
// ────────────────────────────────────────────────
export async function deleteUser(id) {
  if (!id) {
    return { success: false, error: "User ID is required" };
  }

  await dbConnect();

  try {
    const deleted = await User.findByIdAndDelete(id).lean();

    if (!deleted) {
      return { success: false, error: "User not found" };
    }

    revalidatePath("/admin/users");
    return { success: true, message: "User deleted successfully" };
  } catch (err) {
    console.error("Delete user error:", err);
    return { success: false, error: "Failed to delete user" };
  }
}

export async function changePassword(formData) {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: "অনুমতি নেই — লগইন করুন" };
  }

  const { userId, currentPassword, newPassword } = formData;

  if (!userId || !currentPassword || !newPassword) {
    return { success: false, error: "সব তথ্য পূরণ করুন" };
  }

  await dbConnect();

  const user = await User.findById(userId);
  if (!user || user.email !== session.user.email) {
    return { success: false, error: "ব্যবহারকারী পাওয়া যায়নি বা অনুমতি নেই" };
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return { success: false, error: "বর্তমান পাসওয়ার্ড সঠিক নয়" };
  }

  if (newPassword.length < 6) {
    return {
      success: false,
      error: "নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
    };
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { success: true, message: "পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে" };
}
