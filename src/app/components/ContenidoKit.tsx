"use client";

import Image from "next/image";
import { waterfont } from "../fonts";

export default function MaterialEBV() {
    /* const [activeTab, setActiveTab] = useState<
        "preescolar" | "escolar" | "extra"
    >("preescolar");
 */
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 text-slate-800">
            {/* Intro promocional */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2">
                <Image
                    src="/img/Paquete-EBV-25.webp"
                    alt="Imagen promocional del kit"
                    width={450}
                    height={300}
                    className="hover:scale-110 duration-700"
                />
                <div>
                    <h1 className={waterfont.className + " text-4xl"}>
                        ¿Qué incluye?
                    </h1>
                    <p className="text-lg">
                        Por solo 2,000 CUP ponemos a tu disposición todos los
                        elementos que necesitarás para comenzar a planificar tu
                        EBV, facilitando así tu trabajo. En un solo paquete
                        encontraras un ejemplar de todos los artículos
                        disponibles para prepararte y llevar a los
                        niños a disfrutar.
                    </p>
                </div>
            </div>
            {/* 
            { Tabs }
            <div className="flex justify-center space-x-2 mb-4 mt-8">
                {[
                    { key: "preescolar", label: "📘 Preescolares" },
                    { key: "escolar", label: "📗 Escolares" },
                    { key: "extra", label: "📦 Material Adicional" },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() =>
                            setActiveTab(
                                tab.key as "preescolar" | "escolar" | "extra"
                            )
                        }
                        className={`px-4 py-2 rounded-t-md border-b-2 ${
                            activeTab === tab.key
                                ? "border-slate-800 font-semibold"
                                : "border-transparent text-slate-500"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            { Tab content }
            <div
                key={activeTab}
                className="transition-opacity duration-500 ease-in-out opacity-0 animate-fadein"
                style={{ minHeight: "28rem" }}
            >
                {activeTab === "preescolar" && (
                    <ul className="space-y-2">
                        {[
                            "Manual para el líder – PREESCOLARES",
                            "Guía de actividades para preescolares",
                            "Instrucciones para las ayudas visuales (Ayudas 1a)",
                            "Listado de ayudas para preescolares y escolares (Ayudas 1b)",
                            "Cuadros didácticos – Preescolares (Ayudas 2a-e)",
                            "Preguntas (Ayudas 2f)",
                            "Póster del versículo bíblico (Ayudas 5)",
                            "Marcador de versículo (Ayudas 5b)",
                            "Biblia: Sorpresa (Ayudas 6a-b)",
                            "Tarjetas de secuencia de la historia (Ayudas 7)",
                            "Tablero: ¿puedes encontrarlo? (Ayudas 8)",
                            "Tarjetas: ¿puedes encontrarlo? (Ayudas 9)",
                            "Libro: ¿qué es la imagen? (Ayudas 10)",
                            "Palabras del versículo bíblico (Ayudas 11)",
                            "Naturaleza: Sorpresa (Ayudas 12)",
                            "Juego de nubes (Ayudas 13)",
                            "Juego del pozo (Ayudas 14)",
                            "Juego de gotas de agua (Ayudas 15)",
                            "Cubo de juego (Ayudas 16)",
                            "Tarjetas de sincronía (Ayudas 17)",
                            "Tarjetas de palabras (Ayudas 18)",
                            "Imágenes de espejos (Ayudas 19)",
                            "Libro: ¿qué fruta es esta? (Ayudas 19a)",
                        ].map((text, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✔</span>
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {activeTab === "escolar" && (
                    <ul className="space-y-2">
                        {[
                            "Manual para el líder – ESCOLARES",
                            "Guía de actividades para escolares",
                            "Ayudas compartidas para ambos niveles (Ayudas 1b)",
                            "Cuadros didácticos – Escolares (Ayudas 20a-e)",
                            "Posters bíblicos: Salmo 34:3, Juan 1:12, Dt. 31:8b, etc. (Ayudas 23–28)",
                            "Hojas con mensajes escondidos (Ayudas 29)",
                            "Bandera de nogal, Zarigüeyas (Ayudas 30–31)",
                            "Gusanos, insectos, animales de patio (Ayudas 32–35)",
                            "Globos de diálogo, pétalos de verdad, póster de bienvenida (Ayudas 36–38)",
                        ].map((text, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✔</span>
                                <span>{text}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {activeTab === "extra" && (
                    <ul className="space-y-2">
                        {[
                            "Marcadores Exaltado (compartiendo el evangelio)",
                            "Guía para los padres (Guía de la naturaleza)",
                            "Plantillas e ideas para manualidades",
                            "Póster gigante de presentación de EBV2025",
                        ].map((text, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✔</span>
                                <span>{text}</span>
                            </li>
                        ))}

                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✔</span>
                            <span>Memoria Flash con:</span>
                        </li>
                        <ul className="ml-6 pl-4 border-l-4 border-slate-200 bg-slate-50 rounded-md py-2 space-y-2">
                            {[
                                "Material adicional para jóvenes",
                                "Ideas para maestros cristianos",
                                "DVD: videos musicales, karaokes, demostraciones, videos de apoyo",
                            ].map((subtext, j) => (
                                <li key={j} className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">
                                        ✔
                                    </span>
                                    <span>{subtext}</span>
                                </li>
                            ))}
                        </ul>
                    </ul>
                )}
            </div>
 */}
            {/* Bonus */}
            <section className="bg-lime-100 border border-lime-300 rounded-lg p-4 mt-6">
                <h2 className="text-xl font-semibold mb-2">
                    🎁 Bonus para iglesias participantes
                </h2>
                <p>
                    Si tu iglesia queda registrada por alguna compra de nuestros
                    paquetes, recibirá{" "}
                    <strong>200 tratados infantiles gratis</strong> para invitar
                    a los más pequeños de tu barrio a la gran
                    celebración de EBV2025.
                </p>
            </section>
        </div>
    );
}
