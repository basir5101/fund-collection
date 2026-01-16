import { auth } from '@/auth';
import User from '@/models/User';
import { redirect } from 'next/navigation';

export default async function page() {
    const session = await auth();
    if(!session) {
        redirect("/login")
    }
    const email = session.user.email;
    const user = await User.findOne({email});
  return (
    <div>
      
    </div>
  )
}
