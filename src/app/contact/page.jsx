"use client"

export default function page() {
    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            nom: e.target.nom_prenom.value,
            email: e.target.email.value,
            message: e.target.message.value,
        }
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Réponse API :', data);
                // ici tu peux afficher un message de succès dans ton UI
            })
            .catch((err) => {
                console.error('Erreur lors de l’envoi :', err);
            });

    }
    return (
        <div className="u-main-container u-padding-content-container">
            <h1 className="text-4xl font-bold">Formulaire de contact</h1>
            <form onSubmit={handleSubmit} action="" className=" flex flex-col gap-5 mt-10 w-1/2">
                <label htmlFor="nom_prenom">Votre nom et prénom :</label>
                <input name="nom_prenom" id="nom_prenom" className="placeholder:text-gray-300 placeholder:italic mb-5 bg-gray-100 rounded-xl p-1.5 w-2xs focus:outline-none focus:ring focus:border-blue-300 resize-none" type="text" placeholder="Nom Prénom" />

                <label htmlFor="email">Votre email :</label>
                <input name="email" id="email" className="placeholder:text-gray-300 placeholder:italic mb-5 bg-gray-100 rounded-xl p-1.5 w-2xs focus:outline-none focus:ring focus:border-blue-300" type="email" placeholder="email@mail.com" />

                <label htmlFor="message">Expliqez-nous votre projet :</label>
                <textarea name="message" id="message" className="w-full h-50 placeholder:text-gray-300 placeholder:italic mb-5 bg-gray-100 rounded-xl p-1.5 focus:outline-none focus:ring focus:outline-red-900 resize-y" placeholder="Expliqez-nous votre projet"></textarea>

                <button
                    type="submit"
                    className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition cursor-pointer">Envoyer
                </button>
            </form>
        </div>
    )
}
