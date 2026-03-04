"use client";

type Entrenamiento = {
    lugar: string;
    fecha: string;
    iglesia: string;
    direccion: string;
};

const entrenamientos: Entrenamiento[] = []; /* [
    {
        lugar: "Habana Vieja",
        fecha: "15 de abril de 2025",
        iglesia: "Iglesia Emanuel",
        direccion: "Calle Luz #123, Habana Vieja",
    },
    {
        lugar: "Centro Habana",
        fecha: "18 de abril de 2025",
        iglesia: "Iglesia Luz del Mundo",
        direccion: "Calle San Rafael #456, Centro Habana",
    },
    {
        lugar: "Arroyo Naranjo",
        fecha: "20 de abril de 2025",
        iglesia: "Iglesia Cristo Redentor",
        direccion: "Ave. Porvenir #789, Arroyo Naranjo",
    },
    {
        lugar: "Centro Habana",
        fecha: "18 de abril de 2025",
        iglesia: "Iglesia Luz del Mundo",
        direccion: "Calle San Rafael #456, Centro Habana",
    },
    {
        lugar: "Arroyo Naranjo",
        fecha: "20 de abril de 2025",
        iglesia: "Iglesia Cristo Redentor",
        direccion: "Ave. Porvenir #789, Arroyo Naranjo",
    },
    {
        lugar: "Centro Habana",
        fecha: "18 de abril de 2025",
        iglesia: "Iglesia Luz del Mundo",
        direccion: "Calle San Rafael #456, Centro Habana",
    },
    {
        lugar: "Arroyo Naranjo",
        fecha: "20 de abril de 2025",
        iglesia: "Iglesia Cristo Redentor",
        direccion: "Ave. Porvenir #789, Arroyo Naranjo",
    },
]; */

export default function TarjetasEntrenamientos() {
    if (entrenamientos.length === 0) return <></>;
    return (
        <div className="bg-[url(/img/canopy_poppies.png)] bg-center bg-cover p-4">
            <div className="max-w-6xl mx-auto p-6 text-slate-800 bg-slate-100/50 shadow-md rounded-lg backdrop-blur-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Entrenamientos Planificados
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {entrenamientos.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-md border border-slate-200 p-4 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-semibold mb-1 text-blue-700">
                                {item.lugar}
                            </h3>
                            <p className="text-sm text-slate-500 mb-2">
                                {item.fecha}
                            </p>
                            <div className="space-y-1">
                                <p>
                                    <span className="font-semibold">
                                        Iglesia:
                                    </span>{" "}
                                    {item.iglesia}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Dirección:
                                    </span>{" "}
                                    {item.direccion}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
