import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export default async function page() {
    
    const session = await auth();
    console.log("session", session);
    if (!session) {
      redirect("/login");
    }
    await dbConnect();
    const users = await User.find({});
    
  return (
    <div>
      users
    </div>
  )
}
