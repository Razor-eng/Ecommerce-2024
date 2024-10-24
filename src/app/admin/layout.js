import AdminProtectedLayout from './AdminProtectedLayout'
import AuthContextProvider from '@/context/AuthContext'

const AdminLayout = ({ children }) => {
    return (
        <AuthContextProvider>
            <AdminProtectedLayout>
                {children}
            </AdminProtectedLayout>
        </AuthContextProvider>
    )
}

export default AdminLayout