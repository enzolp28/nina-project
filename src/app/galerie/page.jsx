"use client"
import MediaFactory from "@/components/MediaFactory"
import { useState, useEffect, useCallback } from "react"
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa"
import Image from "next/image"
import ModalMedia from "@/components/ModalMedia"



export default function page() {
    const [images, setImages] = useState([])
    const [currentIndex, setCurrentIndex] = useState(null)

    const handleOpenModal = (index) => {
        setCurrentIndex(index)
    }

    const handleCloseModal = () => {
        setCurrentIndex(null)

    }
    const selectedMedia = currentIndex !== null ? images[currentIndex] : null

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }, [images.length])

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }, [images.length])


    useEffect(() => {
        async function fetchImages() {
            try {
                const res = await fetch('/data/images.json')
                const data = await res.json()
                setImages(data)
            } catch (err) {
                console.error('Erreur lors de la recherche des images :', err)
            }
        }

        fetchImages()
    }, []) // tableau de dépendances vide → lancé uniquement au montage

    useEffect(() => {
        if (currentIndex === null || !images.length) return

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') handleCloseModal()
            if (e.key === 'ArrowRight') goNext()
            if (e.key === 'ArrowLeft') goPrev()
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentIndex, images.length, goNext, goPrev])



    return (
        <section className="py-16 mt-10">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="relative inline-block text-3xl leading-tight tracking-tight font-extrabold text-stone-700 my-8 text-center md:text-left md:text-5xl md:my-12">
                    <span className="absolute -inset-1 translate-x-1.5 translate-y-1.5 bg-[#fdcfd3] rounded-lg -z-10 md:-inset-2 md:translate-x-2 md:translate-y-2"></span>
                    <span className="relative bg-[#268b9db7] px-3 py-1 rounded-md border-2 border-amber-50 text-amber-50">
                        Galerie photos
                    </span>
                </h1>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {images.map((item, index) => (
                        <MediaFactory key={item.id} item={item} onClick={() => handleOpenModal(index)} />
                    ))}
                </div>
                {selectedMedia && (

                    <ModalMedia
                        media={selectedMedia}
                        onClose={handleCloseModal}
                        onNext={goNext}
                        onPrev={goPrev}
                        totalItems={images.length}
                        currentIndex={currentIndex}
                    />
                )}
            </div>
        </section>

    )
}
