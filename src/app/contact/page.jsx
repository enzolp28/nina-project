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
        <div className="mx-auto max-w-3xl px-6 py-16 mt-20">
            <h1 className="text-4xl font-bold text-gray-900">Formulaire de contact</h1>
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
                <label htmlFor="nom_prenom">Votre nom et prénom :</label>
                <input
                    name="nom_prenom"
                    id="nom_prenom"
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1"
                    type="text"
                    placeholder="Nom Prénom"
                    required
                />
                <label htmlFor="email">Votre email :</label>
                <input
                    name="email"
                    id="email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1"
                    type="email"
                    placeholder="email@mail.com"
                    required
                />
                <label htmlFor="message">Expliquez-nous votre projet :</label>
                <textarea
                    name="message"
                    id="message"
                    className="min-h-40 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1"
                    placeholder="Expliquez-nous votre projet"
                    required
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="rounded-xl bg-red-500 px-6 py-3 font-medium text-white transition hover:bg-red-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {status === 'loading' ? 'Envoi…' : 'Envoyer'}
                </button>
            </form>
        </div>

    )
}
