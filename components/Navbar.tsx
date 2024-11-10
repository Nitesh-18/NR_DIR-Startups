import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session = await auth();

    return (
        <header className='px-5 py-3 shadow-sm bg-white font-serif text-black' >
            <nav className='flex justify-between items-center'>
                <Link href='/'>
                    <Image src="/logo.png" alt="logo" width={114} height={18} className='rounded-full' />
                </Link>

                <div className='flex items-center gap-5'>
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                "use server";

                                await signOut({ redirectTo: "/", redirect: true });
                            }} >
                                <button type='submit'>
                                    Logout
                                </button>
                            </form>

                            <Link href={`/profile/${session?.id}`}>
                                <span>${session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn('github');
                        }} >
                            <button type='submit'>
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header >
    )
}

export default Navbar
