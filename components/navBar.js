"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
export default function NavBar() {
  const { user, isSignedIn } = useUser();
  return (
    <nav className="pb-3 mx-8 mt-4 border-b shadow-sm">
      <ul className="flex items-center justify-between">
        <Link href="/">
          <Image src={"logo.svg"} alt="logo" width={100} height={100} />
        </Link>
        <div className="flex items-center justify-center gap-3">
          {isSignedIn ? (
            <div className="flex items-center justify-center gap-3">
              <Link href="/dashboard">
                <Button variant="outline" className="rounded-full">
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </div>
          ) : (
            <div>
              <SignInButton>
                <Button className="rounded-full">Get Started</Button>
              </SignInButton>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
}
