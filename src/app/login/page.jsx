import { auth, signIn, signOut } from "@/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }) {
  const session = await auth();

  const { error } = await searchParams;

  const getErrorMessage = (error) => {
    switch (error) {
      case "CredentialsSignin":
        return "Invalid email or password.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  // --- LOGGED IN STATE ---
  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
          <div className="mb-4 flex justify-center">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-2 border-blue-500"
              />
            ) : (
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                {session.user.email[0].toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-500 mt-2">{session.user.email}</p>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="mt-6"
          >
            <button
              type="submit"
              className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-200"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- LOGIN FORM STATE ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Sign In</h1>
          <p className="text-gray-500 mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            {getErrorMessage(error)}
          </div>
        )}

        <form
          action={async (formData) => {
            "use server";
            await dbConnect();
            const email = formData.get("email");
            const user = await User.findOne({ email: email });
            if (!user) {
              redirect("/login?error=CredentialsSignin");
            }
            await signIn("credentials", formData);
            redirect("/admin");
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="name@company.com"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200 transform active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
