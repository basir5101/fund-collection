import { auth } from "@/auth";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const session = await auth();

  // Pass the session down as a prop
  return <Navbar user={session?.user} />;
}
