import React from 'react'
import Image from "next/image";

export default function MediaFactory({ item, className = "", onClick }) {
    if (!item?.type || !item?.src) return null;

    const commonClasses = "border-4 border-amber-50 relative w-full aspect-[4/3] overflow-hidden  cursor-pointer hover:scale-105 transition-transform duration-300 " + className;



    if (item.type === "image") {
        return (
            <div className={commonClasses} onClick={onClick}>

                <Image
                    src={item.src}
                    alt={item.alt || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="object-cover"
                    priority={item.priority}
                />
            </div>
        )
    }

    if (item.type === "video") {
        // Contrôles/autoPlay/muted/loop configurables via l’objet item
        return (
            <div className={commonClasses} onClick={onClick}>
                <video
                    src={item.src}
                    poster={item.poster}
                    controls={item.controls ?? true}
                    autoPlay={item.autoPlay ?? false}
                    muted={item.muted ?? false}
                    loop={item.loop ?? false}
                    playsInline
                    className="w-full h-full object-cover"
                // preload="metadata"
                />
            </div>
        );
    }
    return null
}
