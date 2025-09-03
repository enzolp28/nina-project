import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method non autorisée' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const { name, email, message } = req.body;

    await transporter.sendMail({
        from: `"Formulaire de Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `Nouveau message via le formulaire de ${name}`,
        text: `
            Nom: ${name}
            Email: ${email}
            Message: ${message}
        `,
    });

    res.status(200).json({ message: 'Email envoyé avec succès ✅' });
    console.log('Données reçues :', nom, email, message);

    return res.status(200).json({ message: 'Formulaire bien reçu' });
}