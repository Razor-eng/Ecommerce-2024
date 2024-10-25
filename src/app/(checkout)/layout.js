import AuthContextProvider from "@/context/AuthContext";
import { UserProtectedLayout } from "./UserProtectedLayout";

export default function UserLayout({ children }) {
    return (
        <AuthContextProvider>
            <UserProtectedLayout>
                {children}
            </UserProtectedLayout>
        </AuthContextProvider>
    );
}
