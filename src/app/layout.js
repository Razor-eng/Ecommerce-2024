import { Provider } from "@/providers/theme-provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "EasyBuy.",
  description: "A E-Commerce Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressContentEditableWarning={true} suppressHydrationWarning={true}>
        <Provider>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  );
}
