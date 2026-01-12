import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#268b9db7] text-white flex justify-between p-8">
            <div>
                <nav aria-label="Footer navigation" className="flex flex-col gap-5">
                    <h3 className="font-bold text-lg">Navigation</h3>
                    <ul className="flex flex-col gap-2 text-xs">
                        <li><Link href="/">Accueil</Link></li>
                        <li><Link href="/galerie">Galerie</Link></li>
                        <li><Link href="/#services">Nos services</Link></li>
                    </ul>
                </nav>
            </div>

            <section className="flex flex-col gap-5">
                <h3 className="font-bold text-lg">Info pratique</h3>
                <ul className="flex flex-col gap-2 text-xs">
                    <li><Link href="/#faq">FAQ</Link></li>
                    <li><Link href="#">À propos</Link></li>

                    {/* ✅ lien discret */}
                    <li className="opacity-80 hover:opacity-100">
                        <Link href="/login">Connexion</Link>
                    </li>
                </ul>
            </section>

            <section className="flex flex-col gap-5">
                <h3 className="font-bold text-lg">Contact</h3>
                <ul className="flex flex-col gap-2 text-xs">
                    <li><Link href="/contact">Nous contacter</Link></li>
                    <li>Conditions générales</li>
                    <li>Mention légale</li>
                </ul>
            </section>
        </footer>
    );
}
