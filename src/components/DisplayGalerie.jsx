"use client"
import Image from "next/image"

export default function MiniGalerie() {
    const images = [
        { src: "/images/ballon-1.jpg", alt: "Décoration anniversaire" },
        { src: "/images/ballon-2.jpg", alt: "Candy bar" },
        { src: "/images/ballon-3.jpg", alt: "Mariage élégant" },
        { src: "/images/ballon-1.jpg", alt: "Décor rose pastel" },
        { src: "/images/ballon-2.jpg", alt: "Fête 18 ans" },
        { src: "/images/ballon-3.jpg", alt: "Halloween" },
    ]

    return (
        <section className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-8">Nos réalisations</h2>

            {/* grille responsive: 2 col en mobile, 6 en desktop */}
            <div
                className="
          grid gap-4
          grid-cols-2
          sm:grid-cols-6
          auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px]
        "
            >
                {/* Item 1 - grand bloc gauche */}
                <GalleryItem
                    image={images[0]}
                    className="col-span-2 sm:col-span-3 sm:row-span-3"
                />

                {/* Item 2 */}
                <GalleryItem
                    image={images[1]}
                    className="col-span-1 sm:col-span-2 sm:row-span-1"
                />

                {/* Item 3 */}
                <GalleryItem
                    image={images[2]}
                    className="col-span-1 sm:col-span-1 sm:row-span-1"
                />

                {/* Item 4 */}
                <GalleryItem
                    image={images[3]}
                    className="col-span-1 sm:col-span-2 sm:row-span-1"
                />

                {/* Item 5 */}
                <GalleryItem
                    image={images[4]}
                    className="col-span-1 sm:col-span-2 sm:row-span-2"
                />

                {/* Item 6 - colonne droite haute */}
                <GalleryItem
                    image={images[5]}
                    className="col-span-2 sm:col-span-2 sm:row-span-2"
                />
            </div>
        </section>
    )
}

function GalleryItem({ image, className = "" }) {
    return (
        <div className={`relative overflow-hidden rounded-2xl ${className}`}>
            <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority={false}
            />
        </div>
    )
}
