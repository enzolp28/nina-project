import React from 'react'
import Link from "next/link"

export default function ContactButton({ text, className, typ }) {
    return (
        <Link href={'/contact'}>
            <span className={`inline-block bg-[#a5d8c5] text-white rounded-3xl font-bold ${className}`}>
                {text}
            </span>
        </Link>
    )
}
