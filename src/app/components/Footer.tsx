import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-200 py-8">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">
                {/* Información de contacto */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">📩 Contacto</h3>
                    <p>
                        Email:{" "}
                        <Link
                            href="mailto:info@horadelaluz.org"
                            className="text-blue-300 hover:underline"
                        >
                            info@horadelaluz.org
                        </Link>
                    </p>
                    <p>
                        Teléfono:{" "}
                        <Link
                            href="tel:+5351102875"
                            className="text-blue-300 hover:underline"
                        >
                            +53 511 02875
                        </Link>
                    </p>
                    <p>
                        WhatsApp:{" "}
                        <Link
                            href="https://wa.me/5351102875"
                            className="text-blue-300 hover:underline"
                        >
                            +53 511 02875
                        </Link>
                    </p>
                </div>

                {/* Enlaces sociales */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        🌐 Redes Sociales
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p>
                                Facebook:{" "}
                                <Link
                                    href="https://www.facebook.com/cadahogarkids"
                                    className="text-blue-300 hover:underline"
                                >
                                    <span className="text-blue-300 hover:underline">
                                        @cadahogarkids
                                    </span>
                                </Link>
                            </p>
                            <p>
                                Instagram:{" "}
                                <Link
                                    href="https://www.instagram.com/cadahogarkids"
                                    className="text-blue-300 hover:underline"
                                >
                                    <span className="text-blue-300">
                                        @cadahogarkids
                                    </span>
                                </Link>
                            </p>
                        </div>
                        <div>
                            <p>
                                Facebook:{" "}
                                <Link
                                    href="https://www.facebook.com/cadahogarcuba"
                                    className="text-blue-300 hover:underline"
                                >
                                    <span className="text-blue-300 hover:underline">
                                        @cadahogarcuba
                                    </span>
                                </Link>
                            </p>
                            <p>
                                Instagram:{" "}
                                <Link
                                    href="https://www.instagram.com/cadahogarcuba"
                                    className="text-blue-300 hover:underline"
                                >
                                    <span className="text-blue-300">
                                        @cadahogarcuba
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Línea inferior */}
            <div className="mt-8 text-center text-sm text-slate-400">
                © {new Date().getFullYear()} Cristo en Cada Hogar Cuba – La Hora
                de la luz. Todos los derechos reservados.
            </div>
        </footer>
    );
}
