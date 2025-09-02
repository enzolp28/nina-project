import React from 'react'
import Link from "next/link"

export default function ContactButton({ text, className }) {
    return (
        <Link href={'/contact'}>
            <span className={`inline-block bg-red-500 text-white rounded-3xl font-bold ${className}`}>
                {text}
            </span>
        </Link>
    )
}
