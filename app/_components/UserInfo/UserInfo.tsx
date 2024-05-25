'use client'
import { useSession } from "next-auth/react";

export function UserInfo() {
    const { data: session, status } = useSession();

    if ( status === 'loading' ) {
        return <div>loading...</div>
    }

    if ( !session?.user ) {
        return <div>not logged in</div>
    }

    return (
        <div>
            welcome, {session.user.name}
        </div>
    )
}
