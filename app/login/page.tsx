import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { redirect } from "next/navigation";

function GoogleSignInButton() {
    return (
        <form action="/api/auth/signin/google" method="POST">
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Sign in with Google
            </button>
        </form>
    );
}

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-sm space-y-4 rounded-lg p-6 shadow-lg">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <GoogleSignInButton />
            </div>
        </div>
    );
}