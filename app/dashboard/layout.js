import SideBar from "@/components/sideBar";
import { SignIn, SignedIn } from "@clerk/nextjs";

export default function DashboardLayout({ children }) {
  return (
    <SignedIn>
      <main>
        <div className="fixed md:w-64">
          <SideBar />
        </div>
        <section className="md:ml-64">{children}</section>
      </main>
    </SignedIn>
  );
}
