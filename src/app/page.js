import Image from "next/image";
import ContactButton from "@/components/ContactButton";
import Carroussel from "@/components/Carroussel";
import CardService from "@/components/CardService";


export default function Home() {
  return (
    <main className="  px-20 mt-30 ">
      <div className="flex justify-between gap-10">
        <section className="w-1/3 flex gap-20 justify-center flex-col " >
          <h1 className="text-5xl font-bold text-red-500">TooManyBalloons</h1>
          <p >Chez [Nom de ton entreprise], nous mettons notre créativité et notre savoir-faire au service de vos plus beaux moments. Que ce soit pour un anniversaire, une réception, les fêtes de Noël, ou toute autre occasion spéciale, nous vous accompagnons pour créer une ambiance unique, chaleureuse et inoubliable.
            Chaque événement est une histoire, et notre mission est de la sublimer grâce à des services personnalisés et adaptés à vos envies. Vous avez une idée ? Nous la transformons en réalité. Vous cherchez l’inspiration ? Nous sommes là pour vous guider.
            Faites de chaque moment une célébration à votre image.</p>
        </section>
        <div className="w-1/3 flex justify-center items-center ">
          <div className="h-60 border border-gray-300"></div>
        </div>
        <section className="w-1/3 flex justify-center">
          <Image src='/images/orange-balloons.png' width={400} height={500} alt={'Logo'} className="rounded-3xl" />
          {/* <TransitionImage /> */}
        </section>
      </div>
      <section className="mt-40 mb-20 flex flex-col items-center gap-20 ">
        <h2 className="text-4xl font-bold text-center text-teal-600">Nos Créations</h2>
        <Carroussel />
      </section>
      <section className="py-16 bg-gray-50 rounded-3xl mb-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nos Services</h2>
          <h3 className="text-center text-2xl font-bold">Creation pour vos différents évènements</h3>

          <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-3 my-30 items-stretch">

            <CardService bgClass="bg-blue-100" title="🎉 Anniversaires" description="Décoration festive et personnalisée pour petits et grands, avec des thèmes sur mesure et une ambiance conviviale." />

            <CardService bgClass="bg-yellow-100" title="🎄 Fêtes de fin d’année" description="Création de décors féeriques pour Noël, le Nouvel An et toutes vos célébrations hivernales." />

            <CardService bgClass="bg-green-100" title="🥂 Réceptions & événements privés" description="Mariages, baptêmes, soirées... Une décoration élégante et harmonieuse, pensée dans les moindres détails." />

            <CardService bgClass="bg-pink-100" title="👶 Baby showers & gender reveal" description="Ambiance douce et raffinée pour fêter les plus beaux moments de la vie avec vos proches." /
            >

            <CardService
              bgClass="bg-orange-100"
              title="💼 Prestation en entreprise"
              description="Décoration d'événements professionnels : séminaires, fêtes, team building... pour une ambiance soignée et professionnelle."
            />

            <CardService
              bgClass="bg-violet-100"
              title="🏠 Prestation à domicile"
              description="Nous nous déplaçons chez vous pour tout installer, vous n’avez rien à faire : profitez pleinement de votre événement."
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700 text-lg">
              Nous proposons également une <strong>décoration entièrement sur mesure</strong>, adaptée à vos envies et à votre univers.
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Livraison, installation et retrait inclus si nécessaire. Vous profitez, nous nous occupons de tout !
            </p>
            <ContactButton text="Contactez-nous" className={"mt-20 py-3.5 px-12 hover:bg-red-600 hover:scale-105 transition-transform duration-300 "} />
          </div>

        </div>
      </section>
      {/* <section className="my-30 flex flex-col items-center gap-20 ">
        <div className="flex justify-between gap-30 mb-3">
          <div className="h-60 w-50 border bg-gray-300 border-gray-300 rounded-2xl"></div>
          <div className="h-60 w-50 border bg-gray-300 border-gray-300 rounded-2xl"></div>
          <div className="h-60 w-50 border bg-gray-300 border-gray-300 rounded-2xl"></div>
        </div>
        <ContactButton text="Contactez-nous" className={"py-3.5 px-12 hover:bg-red-600 hover:scale-105 transition-transform duration-300 "} />
      </section> */}
    </main>
  );
}
