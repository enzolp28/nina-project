import Link from 'next/link'
import React from 'react'

export default function Merci() {
    return (
        <div className='flex justify-center items-center flex-col mt-50'>
            <h1 className='mb-10 lg:text-5xl text-3xl font-bold'>Merci</h1>
            <p>Nous vous remercions de votre confiance.</p>
            <p>Nous reviendrons vers vous dans les plus brefs delais.</p>

            <Link
                href={'/'}
                className="mt-10 rounded-xl px-40 py-3 bg-[#a5d8c5] text-white font-bold transition md:hover:hover:bg-[#51c99d] hover:scale-105 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
                Accueil

            </Link>


        </div>
    )
}
