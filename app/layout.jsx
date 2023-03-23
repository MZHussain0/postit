import Nav from "./auth/Nav";
import QueryWrapper from "./auth/QueryWrapper";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "PostIt",
  description: "just post",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`mx-4 md:mx-48 lg:mx-96 ${roboto.variable} bg-gray-200 text-gray-900`}>
        <QueryWrapper>
          <Nav />
          <Toaster />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
