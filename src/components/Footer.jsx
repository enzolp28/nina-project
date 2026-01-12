import React from 'react'
import Link from "next/link"


export default function Footer() {
    return (
        <footer className='bg-[#268b9db7] text-white flex justify-between p-8'>
            <div>
                <nav aria-label="Footer navigation" className='flex flex-col gap-5'>
                    <h3 className='font-bold text-lg '>Navigation</h3>
                    <ul className='flex flex-col gap-2 text-xs'>
                        <Link href={'/'}>
                            <li>Accueil</li>
                        </Link>
                        <Link href={'/galerie'}>
                            <li>Galerie</li>
                        </Link>
                        <Link href={'/#services'}>
                            <li>Nos services</li>
                        </Link>

                    </ul>
                </nav>
            </div>
            {/* <section className='flex flex-col gap-5'>
                <h3 className='font-bold text-lg '>Prestations</h3>
                <ul className='flex flex-col gap-2 text-xs'>
                    <li>Événements d’entreprise</li>
                    <li>Créations sur-mesure</li>
                    <li>Fêtes à thème</li>
                </ul>
            </section> */}
            <section className='flex flex-col gap-5'>
                <h3 className='font-bold text-lg '>Info pratique</h3>
                <ul className='flex flex-col gap-2 text-xs'>
                    <Link href={'/#faq'}>
                        <li>FAQ</li>
                    </Link>
                    <Link href={'#'}>
                        <li>À propos</li>
                    </Link>
                </ul>
            </section>
            <section className='flex flex-col gap-5'>
                <h3 className='font-bold text-lg '>Contact</h3>
                <ul className='flex flex-col gap-2 text-xs'>
                    <Link href={'/contact'}>
                        <li>Nous contacter</li>
                    </Link>
                    <li>Conditions générales</li>
                    <li>Mention légale</li>
                </ul>
            </section>
        </footer>
    )
}