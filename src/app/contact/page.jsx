"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [message, setMessage] = useState('')
    const [showModal, setShowModal] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        setMessage('')

        const formData = {
            nom: e.target.nom_prenom.value,
            email: e.target.email.value,
            message: e.target.message.value,
        }
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data?.error || 'Erreur serveur')
            setStatus('success')
            setMessage(data?.message || 'Votre message a bien été envoyé ✅')
            // Réinitialise le formulaire
            e.target.reset()
            setShowModal(true)
        } catch (err) {
            console.error('Erreur lors de l’envoi :', err)
            setStatus('error')
            setMessage("Une erreur est survenue. Merci d'essayer à nouveau.")
        }
    }

    // Redirige automatiquement vers l'accueil après succès
    useEffect(() => {
        if (showModal) {
            const t = setTimeout(() => router.push('/'), 2200)
            return () => clearTimeout(t)
        }
    }, [showModal, router])

    return (
        <div className="u-main-container u-padding-content-container">
            <h1 className="text-4xl font-bold">Formulaire de contact</h1>
            <form onSubmit={handleSubmit} className=" flex flex-col gap-5 mt-10 w-1/2">
                <label htmlFor="nom_prenom">Votre nom et prénom :</label>
                <input name="nom_prenom" id="nom_prenom" className="placeholder:text-gray-300 placeholder:italic mb-5 bg-gray-100 rounded-xl p-1.5 w-2xs focus:outline-none focus:ring focus:border-blue-300 resize-none" type="text" placeholder="Nom Prénom" required />

                <label htmlFor="email">Votre email :</label>
                <input name="email" id="email" className="placeholder:text-gray-300 placeholder:italic mb-5 bg-gray-100 rounded-xl p-1.5 w-2xs focus:outline-none focus:ring focus:border-blue-300" type="email" placeholder="email@mail.com" required />

                <label htmlFor="message">Expliquez-nous votre projet :</label>
                <textarea name="message" id="message" className="w-full h-50 placeholder:text-gray-300 placeholder:italic mb-5 bg-gray-100 rounded-xl p-1.5 focus:outline-none focus:ring focus:outline-red-900 resize-y" placeholder="Expliquez-nous votre projet" required></textarea>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === 'loading' ? 'Envoi…' : 'Envoyer'}
                </button>
            </form>

            {status === 'error' && (
                <p className="mt-4 text-red-600 font-medium">{message}</p>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => router.push('/')} />
                    <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-xl font-semibold mb-2">Email envoyé avec succès</h2>
                        <p className="text-gray-600 mb-6">{message || 'Votre message a bien été envoyé ✅'}</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => router.push('/')}
                                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition">
                                Retour à l'accueil
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
