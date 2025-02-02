"use client"
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();

    return (
        <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg w-full fixed top-0 left-0 z-50">
            <div className="w-full mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    <Link
                        href="/"
                        className={`text-lg font-bold tracking-wide transition-colors ${pathname === '/'
                                ? 'text-blue-400'
                                : 'text-white hover:text-blue-400'
                            }`}
                    >
                        Typing Nova
                    </Link>

                    {session ? (
                        <div className="flex items-center gap-8">
                            <Link
                                href="/learn"
                                className={`font-medium transition-colors ${pathname === '/learn'
                                        ? 'text-blue-400'
                                        : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                Learn
                            </Link>
                            <Link
                                href="/typingtest"
                                className={`font-medium transition-colors ${pathname === '/typingtest'
                                        ? 'text-blue-400'
                                        : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                Typing Test
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors"
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/api/auth/signin"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors"
                        >
                            Sign in
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}