import React from 'react'


export default function Footer() {
    return (
        <footer className='bg-red-500 text-white flex justify-between p-8'>
            <div>
                <nav aria-label="Footer navigation" className='flex flex-col gap-5'>
                    <h3 className='font-bold text-lg '>Navigation</h3>
                    <ul className='flex flex-col gap-2 text-xs'>
                        <li>À propos </li>
                        <li>Service</li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </div>
            <section className='flex flex-col gap-5'>
                <h3 className='font-bold text-lg '>Prestations</h3>
                <ul className='flex flex-col gap-2 text-xs'>
                    <li>Événements d’entreprise</li>
                    <li>Créations sur-mesure</li>
                    <li>Fêtes à thème</li>
                </ul>
            </section>
            <section className='flex flex-col gap-5'>
                <h3 className='font-bold text-lg '>Info pratique</h3>
                <ul className='flex flex-col gap-2 text-xs'>
                    <li>FAQ</li>
                    <li>Conditions générales</li>
                    <li>Mention légale</li>
                </ul>
            </section>
            <section className='flex flex-col gap-5'>
                <h3 className='font-bold text-lg '>Contact</h3>
                <ul className='flex flex-col gap-2 text-xs'>
                    <li>FAQ</li>
                    <li>Conditions générales</li>
                    <li>Mention légale</li>
                </ul>
            </section>
        </footer>
    )
}