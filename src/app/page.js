"use client"

import Image from "next/image";
import ContactButton from "@/components/ContactButton";
import Carroussel from "@/components/Carroussel";
import CardService from "@/components/CardService";
import DropDown from "@/components/DropDown";
import ModalMedia from "@/components/ModalMedia";
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
    <main className="mt-30 ">
      <div className="flex flex-col  md:flex md:flex-row justify-between gap-10 bg-[#CDEFF3] pb-20 ">
        <div className="mt-20 order-2 w-[80%] md:order-1 relative md:w-1/3 mx-auto">
          <div className="absolute bottom-5 left-5 w-full h-full bg-[#fdcfd3] "></div>
          <section className="border-2 border-amber-50 relative h-full flex flex-col gap-10 justify-center bg-[#bfd8cf]  p-6" >
            <h1 className="text-center text-xl font-bold text-stone-50 break-words md:text-4xl ">Nina Créations</h1>
            <p className="text-lg">Bienvenue sur Nina Créations ! Je conçois des décorations sur mesure pour sublimer vos événements et créer une atmosphère élégante, harmonieuse et mémorable. Que ce soit pour un anniversaire, une réception, Noël ou un moment important, je vous accompagne de l’idée à la mise en place, avec un vrai souci du détail, pour une ambiance chaleureuse et inoubliable.
            </p>
          </section>
        </div>

        <section className="order-1 md:order-2 w-full md:w-1/2 flex justify-center overflow-hidden">
          <div
            className={
              `transform-gpu transition-all duration-700 ease-out
              ${inView ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"}
              motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100`
            }
          >

            <Image src='/images/anniv-un.jpg' width={500} height={600} alt={'Logo'} className="border-4 border-amber-50 mx-auto w-full max-w-[80%] " />
          </div>
        </section>
      </div>

      <section className="mt-10 flex justify-center bg-[#F7D7D2] py-20 border-t-4 border-amber-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full px-6">

          <div
            className="rounded-xl flex justify-center  overflow-hidden border-4 border-amber-50 aspect-[4/5] relative"
          >
            <Image
              src="/images/anniv-lapin.jpg"
              alt="Décoration"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div
            className="rounded-xl flex justify-center  overflow-hidden border-4 border-amber-50 aspect-[4/5] relative"
          >
            <Image
              src="/images/saintval3.jpg"
              alt="Décoration"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div
            className="rounded-xl flex justify-center  overflow-hidden border-4 border-amber-50 aspect-[4/5] relative"
          >
            <Image
              src="/images/paques-salon.jpg"
              alt="Décoration"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>
      </section>


      <section className="py-16 bg-gray-50  mb-30 scroll-mt-24" id="services">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">Nos Services</h2>
          <h3 className="text-xl text-center md:text-2xl font-bold">Creation pour vos différents évènements</h3>

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
      <section className="mb-30 scroll-mt-24" id="faq" >
        <h3 className="text-center text-2xl font-bold">FAQ</h3>
        <div className="display flex flex-col items-center gap-10 my-30">
          <DropDown
            title={"Comment obtenir un devis ?"}
            content={"Envoyez votre date, lieu, photos d’inspiration et budget : on vous répond dans les plus brefs delais avec une proposition."} />
          <DropDown title={"Proposez-vous des décos simples comme des projets plus complexes ?"} content={"Oui. De la petite touche (bouquet, mini arche, table ballon) aux installations plus poussées (arche organique XXL, mur, plafond), on s’adapte au lieu, au budget et au temps."} />
          <DropDown title={"Combien de temps à l’avance faut-il réserver ?"} content={"Il faut reserver idéalement 2–4 semaines avant ; possible en dernière minute selon dispo."} />
        </div>
      </section>
    </main>
  );
}
