"use client"
import { useState, useRef } from 'react'

export default function DropDown({ title, content }) {
    const [open, setOpen] = useState(false)
    const contentRef = useRef(null)

    return (
        <>

            <div className="w-[60%] mx-auto">

                <div className="relative">

                    <div className="absolute bottom-4 left-4 w-full h-14 bg-[#fdcfd3] rounded-md -z-10 pointer-events-none"></div>


                    <div
                        className="flex justify-between items-center w-full h-14 bg-[#bfd8cf] border-2 border-amber-50 rounded-md px-[15px] z-[1] cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <h3 className="font-bold text-[18px] leading-[25px] text-white">{title}</h3>
                        <img
                            src="/images/arrow.svg"
                            alt="flèche menu"
                            className={`transition-transform duration-[600ms] ease-in-out ${open ? "rotate-180" : ""}`}
                        />
                    </div>
                </div>


                <div
                    ref={contentRef}
                    className="bg-amber-50 w-full rounded-md -mt-[10px] mb-[10px] max-h-0 overflow-hidden transition-all duration-[900ms] ease-in-out"
                    style={{ maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px" }}
                >
                    <p className="p-[15px] ">{content}</p>
                </div>
            </div>
        </>
    )
}
