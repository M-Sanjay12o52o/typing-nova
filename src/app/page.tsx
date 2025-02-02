import AuthButton from "@/components/Authbutton";
import { getServerSession } from "next-auth";

export default async function Home() {
    const session = await getServerSession();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <h1 className="text-4xl font-bold mb-6">Typing Nova</h1>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-xl font-semibold mb-4">getServerSession Result</h2>

                {session?.user?.name ? (
                    <div className="text-lg">
                        Signed in as <span className="font-bold">{session.user.name}</span>
                    </div>
                ) : (
                    <div className="text-lg">
                        Not signed in <br />
                        <a
                            href="/api/auth/signin"
                            className="text-blue-400 hover:text-blue-300 transition"
                        >
                            Sign in
                        </a>
                    </div>
                )}
            </div>

            <div className="mt-6">
                <AuthButton />
            </div>
        </div>
    );
}
