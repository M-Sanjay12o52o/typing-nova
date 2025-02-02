"use client";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
    const { data: session } = useSession();

    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-md text-white w-fit">
            {session ? (
                <>
                    <p className="mb-2 text-lg font-semibold">Hello, {session.user?.name} 👋</p>
                    <button
                        onClick={() => signOut()}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                    >
                        Sign out
                    </button>
                </>
            ) : (
                <>
                    <p className="mb-2 text-lg font-semibold">Not signed in</p>
                    <button
                        onClick={() => signIn()}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                    >
                        Sign in
                    </button>
                </>
            )}
        </div>
    );
}

export default AuthButton;
