import AuthButton from "@/components/Authbutton";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
    const session = await getServerSession();

    return (
        <div className="min-h-screen pt-20 px-4 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-4xl mx-auto space-y-16">
                {/* Hero Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                        Typing Nova
                    </h1>
                    {session?.user?.name && (
                        <h2 className="text-xl text-gray-600">
                            Welcome, {session.user.name}
                        </h2>
                    )}
                </div>

                {/* Main Features */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            Take Typing Test
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Test your typing speed and accuracy with our comprehensive typing test.
                        </p>
                        <Link
                            href="/typingtest"
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Start Test
                        </Link>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            Learn Touch Typing
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Master the art of touch typing with our structured learning modules.
                        </p>
                        <Link
                            href="/learn"
                            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                            Start Learning
                        </Link>
                    </div>
                </div>

                {/* Auth Section */}
                <div className="mt-12">
                    {session ? (
                        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
                            <p className="text-gray-600">
                                Track your progress and see your typing statistics here.
                            </p>
                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-gray-700">Tests Taken</h3>
                                    <p className="text-2xl font-bold text-blue-600">0</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-gray-700">Avg. Speed</h3>
                                    <p className="text-2xl font-bold text-green-600">0 WPM</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-gray-700">Accuracy</h3>
                                    <p className="text-2xl font-bold text-purple-600">0%</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                Get Started
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Sign in to track your progress and unlock all features.
                            </p>
                            <AuthButton />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}