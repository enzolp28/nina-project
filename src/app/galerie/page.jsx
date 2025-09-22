import MediaFactory from "@/components/MediaFactory"

export default function page() {
    const media = [
        { id: 1, type: "image", src: "/images/ballon-1.jpg", alt: "Ballon 1", priority: true },
        { id: 2, type: "image", src: "/images/ballon-2.jpg", alt: "Ballons 2" },
        // Image distante (Unsplash)
        { id: 3, type: "image", src: "/images/ballon-3.jpg", alt: "Food" },
        // Vidéo locale
        { id: 4, type: "video", src: "/images/Animals_Puppiness.mp4", muted: true, autoPlay: false, loop: false, controls: true },

    ]
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Galerie</h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {media.map((item) => (
                        <MediaFactory key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>

    )
}
