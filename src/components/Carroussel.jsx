'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import "@/styles/carroussel.css"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const images = [
    "/images/ballon-1.jpg",
    "/images/ballon-2.jpg",
    "/images/ballon-3.jpg",
]

export default function Carroussel() {
    const [index, setIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % images.length)
    }

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    useEffect(() => {
        if (isPaused) {
            return
        }
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length)
        }, 3000)
        return () => clearInterval(interval);
    }, [isPaused])

    return (
        <div className="carroussel__container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}

        >
            <button className="carroussel__button--left" onClick={prevSlide}>
                <FaChevronLeft />
            </button>

            <div className="carroussel__slider">
                <div
                    className="carroussel__track"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {images.map((src, i) => (
                        <div className="carroussel__slide" key={i}>
                            <Image
                                src={src}
                                alt={`Image ${i + 1}`}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button className="carroussel__button--right" onClick={nextSlide}>
                <FaChevronRight />
            </button>
            <div className="carroussel__dots">
                {images.map((_, i) => (
                    <button
                        key={i}
                        className={`carroussel__dot ${i === index ? 'active' : ''}`}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
