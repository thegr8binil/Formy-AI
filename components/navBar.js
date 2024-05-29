import Image from "next/image";
import { Button } from "./ui/button";
export default function NavBar() {
  return (
    <nav className="pb-3 mx-8 mt-4 border-b shadow-sm">
      <ul className="flex items-center justify-between">
        <Image src={"logo.svg"} alt="logo" width={100} height={100} />
        <div className="flex items-center justify-center gap-3">
          <Button variant="outline" className="rounded-full">Sign In</Button>
          <Button className="rounded-full">Sign Up</Button>
        </div>
      </ul>
    </nav>
  );
}

