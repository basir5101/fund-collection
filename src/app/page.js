import Home from "@/components/Home";
import dbConnect from "@/lib/mongodb";
import HomeContent from "@/models/HomePage";

export default async function page() {
  await dbConnect();
  // Convert Mongoose doc to a plain JavaScript object
  const rawContent = await HomeContent.findOne().lean();
  const homeContent = rawContent
    ? JSON.parse(JSON.stringify(rawContent))
    : null;

  console.log("homeContent", homeContent);
  return (
    <div>
      <Home homeContent={homeContent} />
    </div>
  );
}
