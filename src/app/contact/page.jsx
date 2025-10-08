"use client"
import { z } from "zod"
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [message, setMessage] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState({})
    const router = useRouter()

    const nomRef = useRef()
    const emailRef = useRef()
    const messageRef = useRef()



    const validationSchema = z.object({
        nom: z.string()
            .trim()
            .nonempty({ message: 'Le nom est requis' })
            .min(2, { message: 'Le nom est trop court' })
            .max(50, { message: 'Le nom est trop long' })
            .regex(/^(?!\s*$)[a-zA-ZÀ-ÿ\s'-]+$/, {
                message: "Le nom ne doit contenir que des lettres",
            }),
        email: z.string()
            .trim()
            .nonempty({ message: 'Le mail est requis' })
            .email({ message: 'Email invalide' }),
        message: z.string()
            .trim()
            .nonempty({ message: 'Le message est requis' })
            .min(10, { message: 'Le message est trop court' })
            .max(1200, { message: 'Le message est trop long' }),
    })

    const validateField = (name, value) => {
        const singleFieldSchema = z.object({ [name]: validationSchema.shape[name] })

        try {
            singleFieldSchema.parse({ [name]: value })
            setErrorMessage((prev) => ({ ...prev, [name]: '' }))
        } catch (err) {
            if (err instanceof z.ZodError) {
                const issue = err.issues.find((i) => i.path[0] === name)
                setErrorMessage((prev) => ({ ...prev, [name]: issue?.message }))
            }
        }
    }

    const isValid = (name, ref) => {
        return ref.current && ref.current.value.trim() !== '' && !errorMessage[name]
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        setMessage('')

        const formData = {
            nom: e.target.nom_prenom.value,
            email: e.target.email.value,
            message: e.target.message.value,
        }

        const result = validationSchema.safeParse(formData)
        if (!result.success) {
            const fieldErrors = {}
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message
            })
            setErrorMessage(fieldErrors)
            console.error('Formulaire invalide :', result.error.issues[0].message)
            setStatus('error')
            setMessage(result.error.issues[0].message)
            return
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
                <div className="relative">
                    <input
                        ref={nomRef}
                        onBlur={(e) => validateField('nom', e.target.value)}
                        name="nom_prenom"
                        id="nom_prenom"
                        type="text"
                        placeholder="Nom Prénom"
                        required
                        className={`w-full pr-10 rounded-xl border bg-gray-100 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${errorMessage.nom ? 'border-red-500' : 'border-gray-200'
                            }`}
                    />
                    {isValid('nom', nomRef) && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">✅</span>
                    )}
                </div>
                {errorMessage.nom && <p className="text-red-500">{errorMessage.nom}</p>}
                <label htmlFor="email">Votre email :</label>
                <div className="relative">
                    <input
                        ref={emailRef}
                        onBlur={(e) => validateField('email', e.target.value)}
                        name="email"
                        id="email"
                        className={`w-full rounded-xl border bg-gray-100 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${errorMessage.email ? 'border-red-500' : 'border-gray-200'
                            }`}
                        type="email"
                        placeholder="email@mail.com"
                        required
                    />
                    {isValid('email', emailRef) && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">✅</span>
                    )}
                </div>
                {errorMessage.email && <p className="text-red-500">{errorMessage.email}</p>}
                <label htmlFor="message">Expliquez-nous votre projet :</label>

                <div className="relative">
                    <textarea
                        ref={messageRef}
                        onBlur={(e) => validateField('message', e.target.value)}
                        name="message"
                        id="message"
                        className={`min-h-40 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 ${errorMessage.message ? 'border-red-500' : 'border-gray-200'} `}
                        placeholder="Expliquez-nous votre projet"
                        required
                    />
                    {isValid('message', messageRef) && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">✅</span>
                    )}

                </div>
                {errorMessage.message && <p className="text-red-500">{errorMessage.message}</p>}
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="rounded-xl bg-red-500 px-6 py-3 font-medium text-white transition hover:bg-red-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {status === 'loading' ? 'Envoi…' : 'Envoyer'}
                </button>
            </form>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg">
                        <p className="text-lg font-semibold text-gray-900">
                            {message || 'Votre message a bien été envoyé ✅'}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">Redirection en cours…</p>
                    </div>
                </div>
            )}
        </div>

    )
}
