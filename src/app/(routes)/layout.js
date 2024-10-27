import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./dashboard/_components/Header";
import Footer from "./dashboard/_components/Footer";
import AuthContextProvider from "@/context/AuthContext";

export default function DashboardLayout({ children }) {
    return (
        <AuthContextProvider>
            <div className="w-screen h-screen overflow-x-hidden flex flex-col">
                <Header />
                {children}
                <Footer />
            </div>
        </AuthContextProvider>
    );
}
