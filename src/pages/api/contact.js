import nodemailer from 'nodemailer'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée' })
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })

    const { nom, email, message } = req.body || {}

    if (!nom || !email || !message) {
        return res.status(400).json({ error: 'Champs manquants' })
    }

    try {
        await transporter.sendMail({
            from: `"Formulaire de Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Nouveau message via le formulaire de ${nom}`,
            text: `Nom: ${nom}\nEmail: ${email}\nMessage: ${message}`,
        })

        return res.status(200).json({ message: 'Email envoyé avec succès ✅' })
    } catch (err) {
        console.error('Erreur d\'envoi d\'email :', err)
        return res.status(500).json({ error: 'Erreur serveur lors de l\'envoi' })
    }
}
