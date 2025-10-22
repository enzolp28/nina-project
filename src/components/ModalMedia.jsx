"use client"

import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa"
import Image from "next/image"
import { useEffect } from "react"

export default function ModalMedia({
    media,
    onClose,
    onNext,
    onPrev,
    totalItems,
    currentIndex
}) {

    useEffect(() => {
        if (!media || totalItems <= 1) return
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") onNext()
            if (e.key === "ArrowLeft") onPrev()
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [media, onClose, onNext, onPrev, totalItems])

    if (!media) return null

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[5000]"
            onClick={onClose}
        >
            {/* Bouton fermer */}
            <button
                className="absolute top-10 right-10 text-white text-3xl hover:scale-110 cursor-pointer transition duration-200"
                onClick={onClose}
                aria-label="Fermer la modale"
            >
                <FaTimes />
            </button>

            {/* Flèche gauche — ⛳️ en dehors du contenu principal */}
            {totalItems > 1 && (
                <button
                    className="absolute left-10 top-1/2 -translate-y-1/2 text-white text-4xl hover:scale-125 transition duration-200 z-50 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation()
                        onPrev()
                    }}
                    aria-label="Image précédente"
                >
                    <FaChevronLeft />
                </button>
            )}

            {/* Contenu principal */}
            <div
                className="relative flex items-center justify-center max-h-[90vh] max-w-[90vw] animate-zoomIn"
                onClick={(e) => e.stopPropagation()}
            >
                {media.type === "image" && (
                    <div className="relative w-[min(800px,90vw)] h-[min(600px,80vh)]">
                        <Image
                            src={media.src}
                            alt={media.alt ?? ""}
                            fill
                            className="object-contain rounded-lg"
                            sizes="(max-width: 768px) 90vw, 60vw"
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
                        className="max-h-[80vh] max-w-[90vw] w-auto h-auto rounded-lg object-contain"
                    />
                )}

                {totalItems > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-lg font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                        {currentIndex + 1} / {totalItems}
                    </div>
                )}
            </div>

            {/* Flèche droite — ⛳️ elle aussi en dehors */}
            {totalItems > 1 && (
                <button
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-white text-4xl hover:scale-125 transition duration-200 z-50 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation()
                        onNext()
                    }}
                    aria-label="Image suivante"
                >
                    <FaChevronRight />
                </button>
            )}
        </div>
    )
}
