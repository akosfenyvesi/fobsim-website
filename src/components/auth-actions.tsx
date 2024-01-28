import { Navigate, useSearchParams } from "react-router-dom"

const AuthActions = ({ children }: { children: JSX.Element }) => {
    const [searchParams] = useSearchParams();

    const mode: string | null = searchParams.get('mode');
    const oobCode: string | null = searchParams.get('oobCode');

    if (mode === 'resetPassword') {
        const resetPasswordPath = `/reset-password?oobCode=${oobCode}`;

        return <Navigate to={resetPasswordPath} replace />
    } else if (mode === 'verifyEmail') {
        const confirmEmailPath = `/confirmEmail?oobCode=${oobCode}`

        return <Navigate to={confirmEmailPath} replace />
    }

    return children;
}

export default AuthActions;