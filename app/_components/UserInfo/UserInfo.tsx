import { getSession } from '@auth0/nextjs-auth0';

export async function UserInfo() {
    const session = await getSession();

    const user = session?.user;

    return (
        user && (
            <div>
                <h5>Welcome, {user.name}</h5>
            </div>
        )
    );
}
