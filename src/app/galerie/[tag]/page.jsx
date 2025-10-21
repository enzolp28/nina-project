"use client"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import ModalMedia from "@/components/ModalMedia"
import MediaFactory from "@/components/MediaFactory"

export default function GalerieTag() {
    const { tag } = useParams()
    const [images, setImages] = useState([])
    const [currentIndex, setCurrentIndex] = useState(null) // 👉 savoir quelle image est ouverte

    // Charger et filtrer les images selon le tag
    useEffect(() => {
        async function fetchImages() {
            try {
                const res = await fetch("/data/images.json")
                const data = await res.json()
                const filtered = data.filter((image) => image.tags.includes(tag))
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
        <section className="px-20 py-30">
            <h2 className="text-3xl font-bold text-center mb-20 capitalize">
                Galerie : {tag}
            </h2>

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
                    <p className="text-center text-gray-500">
                        Aucune image trouvée pour cette catégorie.
                    </p>
                )}
            </div>

            {/* Composant modale réutilisable */}
            <ModalMedia
                media={selectedMedia}
                onClose={handleCloseModal}
                onNext={goNext}
                onPrev={goPrev}
                totalItems={images.length}

            />
        </section>
    )
}
