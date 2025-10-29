'use client'
import Image from "next/image"
import ContactButton from "./ContactButton"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useCallback } from "react"



export default function Nav() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)
    const toggleMobile = useCallback(() => setMobileOpen(v => !v), [])
    const closeMobile = useCallback(() => setMobileOpen(false), [])

    return (

        <>
            <nav className="p-2 flex items-center justify-between fixed top-0 w-full z-[1111] bg-[#CDEFF3] border-b border-white/40">


                <Link className="flex items-center ml-4" href={'/'}>
                    <Image src='/images/logo-balloons.png' width={50} height={50} alt={'Logo'} />
                    <span className="font-bold">Too Many Balloons</span>
                </Link>

                <div className="hidden md:flex items-center gap-10 mr-5">
                    <span className={`font-semibold ${pathname === '/' ? 'text-[#f6959f] underline underline-offset-4' : ''}`}>
                        <Link href={'/'}>Accueil</Link>
                    </span>
                    <span className={`font-semibold ${pathname === '/galerie' ? 'text-[#f6959f] underline underline-offset-4' : ''}`}>
                        <Link href={'/galerie'}>Galerie</Link>
                    </span>
                    <ContactButton text={"Contact"} className={"py-2 px-8 ml-5 transition hover:bg-[#51c99d] hover:scale-105 "} />
                </div>

                <button
                    onClick={toggleMobile}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-menu"
                    className="md:hidden inline-flex items-center justify-center w-10 h-10 mr-3 rounded-lg border border-black/10"
                >
                    <span className="sr-only">Ouvrir le menu</span>
                    <div className="space-y-1.5">
                        {/* barre 1 */}
                        <span className={`block h-0.5 w-6 bg-black transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
                        {/* barre 2 */}
                        <span className={`block h-0.5 w-6 bg-black transition ${mobileOpen ? "opacity-0" : ""}`} />
                        {/* barre 3 */}
                        <span className={`block h-0.5 w-6 bg-black transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                    </div>
                </button>


            </nav>

            {mobileOpen && (
                <div className="fixed inset-0 z-[1110] md:hidden">
                    {/* Overlay sombre qui ferme au clic */}
                    <div className="absolute inset-0 bg-black/40" onClick={closeMobile} />

                    {/* Panneau latéral droit */}
                    <div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        className="absolute top-0 right-0 h-full w-[78%] max-w-xs bg-[#CDEFF3] border-l border-white/40 p-4 overflow-y-auto
                 transition-transform duration-300 translate-x-0 will-change-transform"
                    >
                        <nav>
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <Link
                                        href="/"
                                        onClick={closeMobile}
                                        className={`block px-3 py-3 rounded-lg ${pathname === "/" ? "text-[#f6959f]" : ""}`}
                                    >
                                        Accueil
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/galerie"
                                        onClick={closeMobile}
                                        className={`block px-3 py-3 rounded-lg ${pathname === "/galerie" ? "text-[#f6959f]" : ""}`}
                                    >
                                        Galerie
                                    </Link>
                                </li>
                                <li className="pt-2">
                                    <ContactButton
                                        text="Contact"
                                        className="w-full text-center py-3 rounded-xl bg-[#fdcfd3] border border-white/40"
                                        /* si ContactButton n'accepte pas onClick, tu peux wrapper dans un Link ou laisser sans */
                                        onClick={closeMobile}
                                    />
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}


        </>


    )
}
