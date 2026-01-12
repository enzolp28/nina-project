"use client"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import ModalMedia from "@/components/ModalMedia"
import MediaFactory from "@/components/MediaFactory"
import Link from "next/link"

export default function GalerieTag() {
    const { tag } = useParams()
    const [images, setImages] = useState([])
    const [currentIndex, setCurrentIndex] = useState(null)

    // Charger et filtrer les images selon le tag
    useEffect(() => {
        async function fetchImages() {
            try {
                // const res = await fetch("/data/images.json")
                const res = await fetch("/api/images", { cache: "no-store" })
                const data = await res.json()

                const allImages = Array.isArray(data) ? data : []
                const filtered = allImages.filter((image) => (image.tags || []).includes(tag))

                setImages(filtered)
            } catch (err) {
                console.error("Erreur lors du chargement des images :", err)
            }
        }
        fetchImages()
    }, [tag])

    // Ouvrir / fermer la modale
    const handleOpenModal = (index) => setCurrentIndex(index)
    const handleCloseModal = () => setCurrentIndex(null)

    // Aller à l’image suivante / précédente
    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }, [images.length])

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }, [images.length])

    // Déterminer le média sélectionné
    const selectedMedia = currentIndex !== null ? images[currentIndex] : null

    console.log(images);

    return (
        <section className="px-8 py-30">
            <h1 className="relative inline-block text-3xl leading-tight tracking-tight font-extrabold text-stone-700 my-8 text-center md:text-left md:text-5xl md:my-12">
                <span className="absolute -inset-1 translate-x-1.5 translate-y-1.5 bg-[#fdcfd3] rounded-lg -z-10 md:-inset-2 md:translate-x-2 md:translate-y-2"></span>
                <span className="relative bg-[#268b9db7] px-3 py-1 rounded-md border-2 border-amber-50 text-amber-50">
                    Galerie : {tag}
                </span>
            </h1>


            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {images.length > 0 ? (
                    images.map((item, index) => (
                        <MediaFactory
                            key={item.id}
                            item={item}
                            onClick={() => handleOpenModal(index)}
                        />
                    ))
                ) : (
                    <div className="flex flex-col  gap-4">
                        <p className=" text-gray-500">
                            Il n'y a pour l'instant aucune image pour ce thème.
                        </p>
                        <div className="bg-[#268b9d8e] border-2 border-amber-50 text-amber-50 p-2 rounded-md w-[50%] hover:bg-[#268b9db7] hover:scale-110 transition duration-200">
                            <Link href="/">↩️ Page d’accueil</Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Composant modale réutilisable */}
            <ModalMedia
                media={selectedMedia}
                onClose={handleCloseModal}
                onNext={goNext}
                onPrev={goPrev}
                totalItems={images.length}
                currentIndex={currentIndex}

            />
        </section>
    )
}
