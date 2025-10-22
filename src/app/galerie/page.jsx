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
        <section className="py-16 mt-20">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Galerie</h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

                    // <div
                    //     className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur z-5000"
                    //     onClick={handleCloseModal}
                    // >
                    //     <button
                    //         className="absolute top-15 right-20 text-white text-3xl z-10 hover:cursor-pointer hover:scale-110 transition duration-200"
                    //         onClick={handleCloseModal}
                    //         aria-label="Fermer la modale"
                    //     >
                    //         <FaTimes />
                    //     </button>
                    //     <div className="relative max-w-4xl" onClick={(event) => event.stopPropagation()} >

                    //         <div className="relative flex items-center justify-center">


                    //         </div>

                    //         <button
                    //             className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer z-10 hover:scale-130 transition duration-200"
                    //             onClick={goPrev}
                    //             aria-label="Image précédente">
                    //             <FaChevronLeft />
                    //         </button>
                    //         {selectedMedia.type === "image" && (
                    //             <div className="relative max-w-4xl w-full">
                    //                 <div className="relative w-[800px] h-[600px]">
                    //                     <Image
                    //                         src={selectedMedia.src}
                    //                         alt={selectedMedia.alt ?? ""}
                    //                         fill
                    //                         className="object-contain rounded-lg"
                    //                         sizes="(max-width: 768px) 100vw, 60vw"
                    //                     />
                    //                 </div>
                    //             </div>

                    //         )}
                    //         {selectedMedia.type === "video" && (
                    //             <video
                    //                 src={selectedMedia.src}
                    //                 poster={selectedMedia.poster}
                    //                 controls
                    //                 autoPlay
                    //                 muted
                    //                 loop
                    //                 playsInline
                    //             />
                    //         )}
                    //         <button
                    //             className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer z-10 hover:scale-130 transition duration-200"
                    //             onClick={goNext}
                    //             aria-label="Image suivante
                    //             "
                    //         >
                    //             <FaChevronRight />
                    //         </button>
                    //     </div>

                    // </div>
                )}
            </div>
        </section>

    )
}
