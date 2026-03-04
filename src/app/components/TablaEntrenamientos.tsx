"use client";

type Entrenamiento = {
    lugar: string;
    fecha: string;
    iglesia: string;
    direccion: string;
};

const entrenamientos: Entrenamiento[] = [
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
];

export default function TablaEntrenamientos() {
    return (
        <div className="max-w-xl mx-auto p-6 bg-slate-100/50 shadow-md rounded-lg backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
                Entrenamientos Planificados
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-slate-300 rounded-md overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700">
                        <tr>
                            <th className="p-2 border">Lugar</th>
                            <th className="p-2 border">Fecha</th>
                            <th className="p-2 border">Iglesia</th>
                            <th className="p-2 border">Dirección</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entrenamientos.map((item, idx) => (
                            <tr key={idx} className="even:bg-slate-50">
                                <td className="p-2 border">{item.lugar}</td>
                                <td className="p-2 border">{item.fecha}</td>
                                <td className="p-2 border">{item.iglesia}</td>
                                <td className="p-2 border">{item.direccion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
