import "./globals.css";
import Image from "next/image";

import { waterfont, Helvetica } from "./fonts";
import FormularioRegistro from "./components/Form";
import MaterialEBV from "./components/ContenidoKit";
import Link from "next/link";
import TarjetasEntrenamientos from "./components/TarjetasEntrenamientos";
import Footer from "./components/Footer";

export default function Home() {
    return (
        <main className="overflow-x-hidden m-0 p-0">
            {/* Seccion Inicio */}
            <div className="relative bg-[url(/img/fondo_s1.webp)] bg-cover bg-center bg-no-repeat h-screen flex flex-col justify-center items-center text-center pt-12 md:pt-0">
                <Image
                    src="/img/logos/span_FullColorStack Subtitle.png"
                    alt="Logo"
                    width={350}
                    height={350}
                    className="md:hidden scale-animation z-20"
                />
                <Image
                    src="/img/logos/span_FullColorStack Subtitle.png"
                    alt="Logo"
                    width={400}
                    height={400}
                    className="hidden md:block scale-animation z-20"
                />
                <h1
                    className={
                        waterfont.className +
                        " text-6xl text-slate-900 space-y-4"
                    }
                >
                    PAQUETE DE INICIO <br />
                    ESCUELA BÍBLICA DE VERANO 2025
                </h1>
                <div className="my-8 flex flex-col md:flex-row w-full justify-center items-center hover:scale-110 duration-700">
                    <Link href="/#registro">
                        <button
                            className={
                                waterfont.className +
                                " text-3xl bg-white rounded-4xl text-slate-800 px-6 py-2 order-first md:order-last"
                            }
                        >
                            Preordena Ahora
                        </button>
                    </Link>
                </div>

                {/* Imagenes superpuestas */}
                <div className="absolute w-72 h-screen bottom-[4%] left-[-4%]">
                    <Image
                        src="/img/bee-cutout.png"
                        alt="Abeja"
                        width={80}
                        height={80}
                        className="absolute top-[19%] left-[60%] z-10 hidden md:block bee-animation"
                    />
                    <Image
                        src="/img/cut-out-flower-new2_web-hero.webp"
                        alt="Flor"
                        width={400}
                        height={400}
                        className="absolute top-[19%] left-[-11%] z-10 hidden md:block flower-animation"
                    />
                    <Image
                        src="/img/leaf-cutout.webp"
                        alt="Flor"
                        width={320}
                        height={320}
                        className="absolute bottom-[25%] left-[-16%] z-10 hidden md:block flower-animation"
                    />
                </div>
            </div>

            {/* Seccion Puente */}
            <div
                className={
                    waterfont.className +
                    " w-full h-full bg-white flex flex-col justify-center items-center"
                }
            >
                <p
                    className={
                        Helvetica.className +
                        " text-4xl text-slate-800 text-center px-2 py-8"
                    }
                >
                    Únete a la experiencia y aprovecha esta oportunidad única
                    gracias a la alianza entre Cristo en Cada Hogar Cuba, “La
                    hora de la luz” y Lifeway
                </p>
            </div>

            <div className="w-full h-full pb-8 bg-white flex flex-col md:flex-row justify-center space-x-2">
                <div className="px-4 md:flex-1/2 pt-10 space-y-8 rounded-2xl mx-2">
                    <h1
                        className={
                            waterfont.className +
                            " text-5xl text-slate-800 text-center"
                        }
                    >
                        ¡Hechos para exaltar a Dios!
                    </h1>
                    <p className={Helvetica.className + " text-2xl text-black"}>
                        Lleva a los niños a descubrir el asombroso mundo de Dios
                        y a exaltar su grandeza. En esta edición especial, los
                        más pequeños aprenderán que Dios nos creó, nos cuida,
                        nos ama, nos perdona y cumple cada una de sus promesas.
                        EBV2025 es la oportunidad perfecta para que juntos
                        alabemos y proclamemos su fidelidad. ¡Fuimos hechos
                        para exaltar a Dios!
                    </p>
                    <div className="flex justify-center">
                        <a
                            href="https://cloud.horadelaluz.org/s/XCsBooSfbiRYdn8/download/promo_exaltado.mp4"
                            download
                        >
                            <button
                                className={
                                    waterfont.className +
                                    " text-3xl bg-green-700 rounded-2xl px-6 py-2" +
                                    " hover:bg-green-900 hover:scale-110 transition duration-700"
                                }
                            >
                                Descargar Video Promocional (202 mb)
                            </button>
                        </a>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center my-8 md:flex-1/2">
                    <iframe
                        className="w-full max-w-2xl h-64 md:h-96 rounded-lg shadow-lg"
                        src="https://www.youtube.com/embed/n8DlLYrTTJY?controls=1"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            {/* Seccion Formulario */}
            <div className="bg-[url(/img/canopy_greentrees.png)] bg-center bg-cover p-8">
                <div id="registro">
                    <FormularioRegistro />
                </div>
            </div>

            <div className="bg-white">
                <MaterialEBV />
            </div>
            <div>
                <TarjetasEntrenamientos />
            </div>
            <Footer />
        </main>
    );
}
