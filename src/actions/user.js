// app/actions/register.js
"use server";

import dbConnect from "@/lib/mongodb";
// import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerUser(formData) {
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
      email,
      password: hashedPassword,
      role,
    });
  } catch (err) {
    return { error: "Something went wrong during registration" };
  }

  redirect("/login");
}


export async function updateUser(formData) {
  
}