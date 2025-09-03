
export default function page() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nos Services</h2>

                <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-3 my-30">
                    <div className="bg-blue-100 shadow-md rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">🎉 Anniversaires</h3>
                        <p className="text-gray-600">
                            Décoration festive et personnalisée pour petits et grands, avec des thèmes sur mesure et une ambiance conviviale.
                        </p>
                    </div>

                    <div className="bg-yellow-100 shadow-md rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">🎄 Fêtes de fin d’année</h3>
                        <p className="text-gray-600">
                            Création de décors féeriques pour Noël, le Nouvel An et toutes vos célébrations hivernales.
                        </p>
                    </div>

                    <div className="bg-green-100 shadow-md rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">🥂 Réceptions & événements privés</h3>
                        <p className="text-gray-600">
                            Mariages, baptêmes, soirées... Une décoration élégante et harmonieuse, pensée dans les moindres détails.
                        </p>
                    </div>

                    <div className="bg-pink-100 shadow-md rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">👶 Baby showers & gender reveal</h3>
                        <p className="text-gray-600">
                            Ambiance douce et raffinée pour fêter les plus beaux moments de la vie avec vos proches.
                        </p>
                    </div>

                    <div className="bg-orange-100 shadow-md rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">💼 Prestation en entreprise</h3>
                        <p className="text-gray-600">
                            Décoration d'événements professionnels : séminaires, fêtes, team building... pour une ambiance soignée et professionnelle.
                        </p>
                    </div>

                    <div className="bg-violet-100 shadow-md rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-2">🏠 Prestation à domicile</h3>
                        <p className="text-gray-600">
                            Nous nous déplaçons chez vous pour tout installer, vous n’avez rien à faire : profitez pleinement de votre événement.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-700 text-lg">
                        Nous proposons également une <strong>décoration entièrement sur mesure</strong>, adaptée à vos envies et à votre univers.
                    </p>
                    <p className="mt-2 text-gray-500 text-sm">
                        Livraison, installation et retrait inclus si nécessaire. Vous profitez, nous nous occupons de tout !
                    </p>
                </div>
            </div>
        </section>

    )
}
