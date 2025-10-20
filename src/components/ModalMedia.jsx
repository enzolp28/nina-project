"use client"

import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa"
import Image from "next/image"
import { useEffect } from "react"


export default function ModalMedia({
    media,
    onClose,
    onNext,
    onPrev,
    totalItems
}) {

    useEffect(() => {
        if (!media) return

        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") onNext()
            if (e.key === "ArrowLeft") onPrev()
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [media, onClose, onNext, onPrev])

    if (!media) return null

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur z-50"
            onClick={onClose}
        >
            <button
                className="absolute top-12 right-12 text-white text-3xl z-10 hover:scale-110 transition"
                onClick={onClose}
                aria-label="Fermer la modale"
            >
                <FaTimes />
            </button>

            <div
                className="relative max-w-4xl"
                onClick={(e) => e.stopPropagation()} // empêche la fermeture quand on clique sur le média
            >
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:scale-125 transition"
                    onClick={onPrev}
                    aria-label="Image précédente"
                >
                    <FaChevronLeft />
                </button>

                {media.type === "image" && (
                    <div className="relative w-[800px] h-[600px]">
                        <Image
                            src={media.src}
                            alt={media.alt ?? ""}
                            fill
                            className="object-contain rounded-lg"
                            sizes="(max-width: 768px) 100vw, 60vw"
                        />
                    </div>
                )}

                {media.type === "video" && (
                    <video
                        src={media.src}
                        poster={media.poster}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="max-w-4xl rounded-lg"
                    />
                )}

                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:scale-125 transition"
                    onClick={onNext}
                    aria-label="Image suivante"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    )
}

