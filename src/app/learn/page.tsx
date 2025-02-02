import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function ProtectedRoute() {
    // This is a protected route. Use will only see this if they are authenticated.
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    return (
        <div>
            <h1>Learn</h1>
        </div>
    );
}
