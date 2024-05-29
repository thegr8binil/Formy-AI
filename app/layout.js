import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import NavBar from "@/components/navBar";
import { ClerkProvider } from "@clerk/nextjs";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Formy-AI",
  description: "Transform Your Form Creation With AI Magic in a Snap",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={cn(
            "h-screen bg-background font-sans antialiased w-screen overflow-x-hidden overflow-y-hidden",
            fontSans.variable
          )}
        >
          <NavBar />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
