// app/admin/page.js
import dbConnect from "@/lib/mongodb";
import HomeContent from "@/models/HomePage";
import AdminForm from "./AdminForm";

export default async function AdminPage() {
  await dbConnect();

  // Convert Mongoose doc to a plain JavaScript object
  const rawContent = await HomeContent.findOne().lean();
  const homeContent = rawContent
    ? JSON.parse(JSON.stringify(rawContent))
    : null;

  console.log("homeContent", homeContent);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            {homeContent ? "Edit Home Content" : "Create Home Content"}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your landing page sections from here.
          </p>
        </header>

        <div className="bg-white shadow-xl rounded-2xl p-8">
          <AdminForm initialData={homeContent} />
        </div>
      </div>
    </div>
  );
}
