import { auth } from "@/auth";
import UsersList from "@/components/Users/UsersList";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function UsersPage({ searchParams }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/admin");
  }

  // Optional: add admin check if needed
  // if (session.user.role !== "admin") redirect("/dashboard");

  await dbConnect();

  // For development / demo — remove or comment out in production
  const users = await User.find({})
    .lean()
    .then((docs) =>
      docs.map((doc) => ({
        ...doc,
        _id: doc._id.toString(),
      })),
    );

  // If you implement real pagination later:
  // const page = Number(searchParams.page) || 1;
  // const limit = 20;
  // const skip = (page - 1) * limit;
  // const totalUsers = await User.countDocuments();
  // const totalPages = Math.ceil(totalUsers / limit);

  return (
    <div className="min-h-screen bg-gray-50/40 py-10 px-4 sm:px-6 lg:px-8">
      <UsersList users={users} />
    </div>
  );
}
