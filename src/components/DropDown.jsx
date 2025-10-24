"use client"
import { useState, useRef } from 'react'

export default function DropDown({ title, content }) {
    const [open, setOpen] = useState(false)
    const contentRef = useRef(null)

    return (
        <>
            <div className='relative flex flex-col items-center w-[60%] '>
                <div className='absolute bottom-4 left-4 w-full h-full bg-[#fdcfd3] rounded-md '></div>
                <div className=" flex justify-between items-center w-full bg-[#bfd8cf] border-2 border-amber-50 rounded-md p-[15px] z-[2] cursor-pointer" onClick={() => setOpen(!open)}>
                    <h3 className='font-bold text-[18px] leading-[25px] text-white'>{title}</h3>
                    <img src="./images/arrow.svg" alt="flèche menu" className={`transition-transform duration-[600ms] ease-in-out  ${open ? 'rotate-180' : ''}`} />
                </div>
                <div ref={contentRef} className={`bg-[#f6f6f6] w-full rounded-[5px] mb-[10px] max-h-0 overflow-hidden transition-all duration-[900ms] ease-in-out`}
                    style={{ maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px" }}
                >
                    <p className='p-[15px]'>{content}</p>
                </div>
            </div>
        </>
    )
}
