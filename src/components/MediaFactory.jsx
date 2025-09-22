import React from 'react'
import Image from "next/image";

export default function MediaFactory({ item, className = "" }) {
    if (!item?.type || !item?.src) return null;

    if (item.type === "image") {
        return (
            <div className={`relative w-full aspect-[4/3] overflow-hidden rounded-xl ${className}`}>
                <Image
                    src={item.src}
                    alt={item.alt || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={item.priority}
                />
            </div>
        )
    }

    if (item.type === "video") {
        // Contrôles/autoPlay/muted/loop configurables via l’objet item
        return (
            <div className={`relative w-full overflow-hidden rounded-xl ${className}`}>
                <video
                    src={item.src}
                    poster={item.poster}
                    controls={item.controls ?? true}
                    autoPlay={item.autoPlay ?? false}
                    muted={item.muted ?? false}
                    loop={item.loop ?? false}
                    playsInline
                    className="w-full h-auto"
                // preload="metadata"
                />
            </div>
        );
    }
    return null
}
