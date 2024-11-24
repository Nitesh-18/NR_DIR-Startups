import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/" className="group inline-block">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={144}
                        height={30}
                        className="transition duration-300 ease-in-out transform group-hover:scale-105 group-hover:brightness-110"
                    />
                </Link>


                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create" className="relative group">
                                <button
                                    className="px-4 py-2 rounded-md bg-[#ff5c1b] text-white-100 font-semibold transition duration-300 ease-in-out transform group-hover:scale-105 group-hover:brightness-110 group-hover:text-[#fdae31]
 max-sm:hidden"
                                >
                                    Create
                                </button>
                                <BadgePlus className="size-6 text-[#ff5c1b] sm:hidden transition duration-300 ease-in-out transform group-hover:scale-125" />
                            </Link>


                            <form
                                action={async () => {
                                    "use server";
                                    await signOut({ redirectTo: "/" });
                                }}
                                className="relative group"
                            >
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md bg-[#ff5c1b] text-white font-semibold transition duration-300 ease-in-out transform group-hover:scale-105 group-hover:brightness-110 group-hover:text-[#fdae31]
 max-sm:hidden"
                                >
                                    Logout
                                </button>
                                <LogOut
                                    className="size-6 text-[#ff5c1b] sm:hidden transition duration-300 ease-in-out transform group-hover:scale-125"
                                />
                            </form>


                            <Link href={`/user/${session?.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src={session?.user?.image || ""}
                                        alt={session?.user?.name || ""}
                                    />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                "use server";

                                await signIn("github");
                            }}
                        >
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;