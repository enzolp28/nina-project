import React from 'react'
import Link from "next/link"


export default function CardService({ bgClass, title, description }) {
    return (
        <Link href={'/service'}>
            <div className={`${bgClass} shadow-md rounded-2xl p-6 h-full hover:scale-110 transition duration-200`}>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">
                    {description}
                </p>
            </div>
        </Link>
    )
}
