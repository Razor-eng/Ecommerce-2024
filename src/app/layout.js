import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "EasyBuy.",
  description: "A E-Commerce Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
