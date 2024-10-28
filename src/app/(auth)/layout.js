import AuthContextProvider from "@/context/AuthContext";
import AuthHeader from "./components/AuthHeader";

export default function AuthLayout({ children }) {
    return (
        <AuthContextProvider>
            <div className="flex flex-col h-screen w-screen overflow-hidden">
                <AuthHeader />
                <div className="flex-1 flex items-center justify-center">
                    {children}
                </div>
            </div>
        </AuthContextProvider>
    );
}
