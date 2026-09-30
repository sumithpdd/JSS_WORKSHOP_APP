import type { Metadata } from "next";
import { AttendeeBar } from "@/components/AttendeeBar";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "JSS Workshop",
  description:
    "Learn Sitecore headless by building the training site you are learning from.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <AttendeeBar />
        {children}
      </body>
    </html>
  );
}
