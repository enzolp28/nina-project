"use client"

import Image from "next/image";
import ContactButton from "@/components/ContactButton";
import Carroussel from "@/components/Carroussel";
import CardService from "@/components/CardService";
import DropDown from "@/components/DropDown";
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react";


export default function Home() {
  const router = useRouter()
  const [tags, setTags] = useState([])
  const [inView, setInView] = useState(false)

  useEffect(() => {
    setInView(true)
    const fetchTags = async () => {

      try {
        const res = await fetch('/data/images.json')
        const data = await res.json()
        const allTags = data.flatMap(item => item.tags)
        const uniqueTags = [...new Set(allTags)]
        setTags(uniqueTags)
        console.log(uniqueTags);


      }
      catch (err) {
        console.log(err)
      }
    }
    fetchTags()
  }, [])

  return (
    <main className=" mt-30 ">
      <div className="flex justify-between gap-10 bg-[#CDEFF3] pb-20">
        <div className="relative w-1/3 mx-auto">
          <div className="absolute bottom-5 left-5 w-full h-full bg-[#fdcfd3] "></div>
          <section className="border-2 border-amber-50 relative h-full flex flex-col gap-10 justify-center bg-[#bfd8cf]  p-6" >
            <h1 className="text-4xl font-bold text-stone-50">TooManyBalloons</h1>
            <p >Chez [Nom de ton entreprise], nous mettons notre créativité et notre savoir-faire au service de vos plus beaux moments. Que ce soit pour un anniversaire, une réception, les fêtes de Noël, ou toute autre occasion spéciale, nous vous accompagnons pour créer une ambiance unique, chaleureuse et inoubliable.
              Chaque événement est une histoire, et notre mission est de la sublimer grâce à des services personnalisés et adaptés à vos envies. Vous avez une idée ? Nous la transformons en réalité. Vous cherchez l’inspiration ? Nous sommes là pour vous guider.
              Faites de chaque moment une célébration à votre image.</p>
          </section>
        </div>
        {/* <div className="w-1/3 flex justify-center items-center ">
          <div className="h-60 border border-gray-300"></div>
        </div> */}
        <section className="w-1/2 flex justify-center overflow-hidden">
          <div
            // 4) classes fixes (transition + perf + accessibilité)
            // 5) ET la partie qui change selon inView (initial vs final)
            className={
              `transform-gpu transition-all duration-700 ease-out
              ${inView ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"}
              motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100`
            }
          >

            <Image src='/images/anniv-un.jpg' width={500} height={600} alt={'Logo'} className="border-4 border-amber-50" />
          </div>
        </section>
      </div>

      <section className="mt-10 flex justify-center bg-[#F7D7D2] py-20 border-t-4 border-amber-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full px-6">

          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border-4 border-amber-50 aspect-[4/5] relative"
            >
              <Image
                src="/images/image-salon.jpg"
                alt="Décoration"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>


      <section className="py-16 bg-gray-50  mb-30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nos Services</h2>
          <h3 className="text-center text-2xl font-bold">Creation pour vos différents évènements</h3>

          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-20 px-10 items-stretch">

            <CardService
              bgClass="bg-blue-100"
              title="🎉 Anniversaires"
              description="Décoration festive et personnalisée pour petits et grands, avec des thèmes sur mesure et une ambiance conviviale."
              tag="anniversaire"
            />

            <CardService
              bgClass="bg-yellow-100"
              title="🎄 Fêtes de fin d’année"
              description="Création de décors féeriques pour Noël, le Nouvel An et toutes vos célébrations hivernales."
              tag="festes"
            />

            <CardService
              bgClass="bg-green-100"
              title="🥂 Réceptions & événements privés"
              description="Mariages, baptêmes, soirées... Une décoration élégante et harmonieuse, pensée dans les moindres détails."
              tag="receptions"
            />

            <CardService
              bgClass="bg-pink-100"
              title="👶 Baby showers & gender reveal"
              description="Ambiance douce et raffinée pour fêter les plus beaux moments de la vie avec vos proches."
              tag="baby-showers"
            />


            <CardService
              bgClass="bg-orange-100"
              title="💼 Prestation en entreprise"
              description="Décoration d'événements professionnels : séminaires, fêtes, team building... pour une ambiance soignée et professionnelle."
              tag="entreprise"
            />

            <CardService
              bgClass="bg-violet-100"
              title="🏠 Prestation à domicile"
              description="Nous nous déplaçons chez vous pour tout installer, vous n’avez rien à faire : profitez pleinement de votre événement."
              tag="domicile"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 text-lg">
              Nous proposons également une <strong>décoration entièrement sur mesure</strong>, adaptée à vos envies et à votre univers.
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Livraison, installation et retrait inclus si nécessaire. Vous profitez, nous nous occupons de tout !
            </p>
            <ContactButton text="Contactez-nous" className={"mt-20 py-3.5 px-12 hover:hover:bg-[#51c99d] hover:scale-105 transition-transform duration-300 "} />
          </div>

        </div>
      </section>
      <section className="mb-30">
        <h3 className="text-center text-2xl font-bold">FAQ</h3>
        <div className="display flex flex-col items-center gap-10 my-30">
          <DropDown title={"sded"} content={"lorem"} />
          <DropDown title={"sded"} content={"fdfefe"} />
          <DropDown title={"sded"} content={"fdfefe"} />


        </div>
      </section>
    </main>
  );
}
