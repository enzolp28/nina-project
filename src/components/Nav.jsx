'use client'
import Image from "next/image"
import ContactButton from "./ContactButton"
import Link from "next/link"
import { usePathname } from "next/navigation"



export default function Nav() {
    const pathname = usePathname()

    return (
        <nav className=" p-2 flex justify-between fixed top-0 w-full z-1111 bg-[#CDEFF3]">
            <Link className="flex items-center ml-4" href={'/'}>
                <Image src='/images/logo-balloons.png' width={50} height={50} alt={'Logo'} />
                <span className="font-bold">Too Many Balloons</span>
            </Link>

            <div className="flex items-center gap-10 mr-5 ">
                <span className={`font-semibold ${pathname === '/' ? 'text-[#f6959f] underline underline-offset-4' : ''}`}>
                    <Link href={'/'}>Accueil</Link>
                </span>
                <span className={`font-semibold ${pathname === '/galerie' ? 'text-[#f6959f] underline underline-offset-4' : ''}`}>
                    <Link href={'/galerie'}>Galerie</Link>
                </span>
                <ContactButton text={"Contact"} className={"py-2 px-8 ml-5 transition hover:bg-[#51c99d] hover:scale-105 "} />
            </div>
        </nav>
    )
}
