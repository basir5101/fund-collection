// app/register/page.js
// import { registerUser } from "../actions/register";

import { registerUser } from "@/actions/user";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>
        <form action={registerUser} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border rounded-lg"
          />
          <select name="role" className="w-full p-3 border rounded-lg">
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
          <button className="w-full bg-green-600 text-white p-3 rounded-lg font-bold">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
