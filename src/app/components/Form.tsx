"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";

// 🔹 Validación del Carnet de Identidad Cubano (CI)
const validateCI = (value: string) => {
    if (!/^\d{11}$/.test(value))
        return "El CI debe tener exactamente 11 dígitos.";

    const year = parseInt(value.substring(0, 2), 10);
    const month = parseInt(value.substring(2, 4), 10);
    const day = parseInt(value.substring(4, 6), 10);
    const centuryDigit = parseInt(value[6], 10);
    const sexDigit = parseInt(value[10], 10);

    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return "Los primeros 6 dígitos deben formar una fecha válida (AAMMDD).";
    }

    if (
        (centuryDigit === 9 && year >= 0 && year <= 99) ||
        (centuryDigit >= 0 && centuryDigit <= 5) ||
        (centuryDigit >= 6 && centuryDigit <= 8)
    ) {
    } else {
        return "El séptimo dígito debe indicar un siglo válido (siglo XIX: 9, siglo XX: 0-5, siglo XXI: 6-8).";
    }

    if (sexDigit % 2 !== 0 && sexDigit % 2 !== 1) {
        return "El último dígito debe indicar el sexo (par = hombre, impar = mujer).";
    }

    return true;
};

// 🔹 Esquema de validación con Zod
const schema = z.object({
    name: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .nonempty("Este campo es obligatorio"),
    tel: z
        .string()
        .regex(
            /^(5\d{7}|\+535\d{7})$/,
            "Número de teléfono inválido en Cuba (Ejemplo: 51234567 o +5351234567)"
        )
        .nonempty("El número de teléfono es obligatorio"),
    email: z.string().email("Correo electrónico inválido").optional(),
    ci: z
        .string()
        .refine(validateCI, { message: "Carnet de identidad inválido." }),
    iglesia: z.string().nonempty("Este campo es obligatorio"),
    denominacion: z.string().nonempty("Este campo es obligatorio"),
    direccion: z.string().nonempty("Este campo es obligatorio"),
    municipio: z.string().nonempty("Este campo es obligatorio"),
    provincia: z.string().nonempty("Este campo es obligatorio"),
    cargo: z.string().optional(),
    cantidad: z.number().min(1).default(1),
});

type RegistroSchemaType = z.infer<typeof schema>;

export default function FormularioRegistro() {
    const [successMessage, setSuccessMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(5);
    const [enviando, setEnviando] = useState(false);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<RegistroSchemaType>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (showModal) {
            const interval = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
            }, 1000);

            const timeout = setTimeout(() => {
                clearInterval(interval);

                const mensaje = encodeURIComponent(
                    `¡Hola! \n Mi nombre es ${getValues(
                        "name"
                    )} y he completado el formulario de pre-reserva del Kit de la EVB "Exaltado". \n Indíqueme cómo puedo hacer el pago para confirmar la orden. \n ¡Gracias!`
                );

                const enlaceWhatsapp = `https://wa.me/5351102875?text=${mensaje}`;

                window.location.href = enlaceWhatsapp; // redirección final
            }, 5000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [showModal, getValues]);

    const onSubmit: SubmitHandler<RegistroSchemaType> = async (data) => {
        setEnviando(true);

        try {
            const response = await fetch("/api/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Error al enviar el formulario");
            }

            setSuccessMessage("¡Registro enviado correctamente!");

            setShowModal(true); // cambia al mensaje

            // Opcional: Redirigir al usuario a su solicitud
            // router.push(`/solicitud/${result.id}`);
        } catch (error) {
            console.error("❌ Error al enviar el formulario:", error);
            setSuccessMessage(
                "Hubo un problema al enviar el registro. Inténtalo más tarde."
            );
        } finally {
            setEnviando(false); // por si quieres reintentar
        }
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
                        <h2 className="text-xl font-semibold mb-2 text-green-700">
                            ¡Pre-reserva exitosa!
                        </h2>
                        <p className="text-slate-700">
                            Serás redirigido para confirmar el pago en{" "}
                            <span className="font-bold">{secondsLeft}</span>{" "}
                            segundos...
                        </p>
                    </div>
                </div>
            )}

            <div className="max-w-xl mx-auto p-6 bg-slate-100/50 shadow-md rounded-lg backdrop-blur-md">
                <h2 className="text-2xl font-semibold mb-4 text-slate-800">
                    Registro
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Nombre */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="name"
                            className="font-semibold text-slate-800"
                        >
                            Nombre y Apellidos:
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register("name")}
                            className="border border-slate-800 p-2 rounded text-slate-800"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.name?.message}
                        </p>
                    </div>

                    {/* Teléfono */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="tel"
                            className="font-semibold text-slate-800"
                        >
                            Número de Teléfono:
                        </label>
                        <input
                            type="tel"
                            id="tel"
                            {...register("tel")}
                            className="border border-slate-800 p-2 rounded text-slate-800"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.tel?.message}
                        </p>
                    </div>

                    {/* Correo Electrónico */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="email"
                            className="font-semibold text-slate-800"
                        >
                            Correo Electrónico (opcional):
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            className="border border-slate-800 p-2 rounded text-slate-800"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.email?.message}
                        </p>
                    </div>

                    {/* Carnet de Identidad */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="ci"
                            className="font-semibold text-slate-800"
                        >
                            Carnet de Identidad:
                        </label>
                        <input
                            type="text"
                            id="ci"
                            {...register("ci")}
                            className="border border-slate-800 p-2 rounded text-slate-800"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.ci?.message}
                        </p>
                    </div>

                    {/* Iglesia */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="iglesia"
                            className="font-semibold text-slate-800"
                        >
                            Nombre de la Iglesia:
                        </label>
                        <input
                            type="text"
                            id="iglesia"
                            {...register("iglesia")}
                            className="border border-slate-800 p-2 rounded text-slate-800"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.iglesia?.message}
                        </p>
                    </div>

                    {/* Denominacion */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="iglesia"
                            className="font-semibold text-slate-800"
                        >
                            Denominación:
                        </label>
                        <input
                            type="text"
                            id="denominacion"
                            {...register("denominacion")}
                            className="border border-slate-800 p-2 rounded text-slate-800"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.denominacion?.message}
                        </p>
                    </div>

                    {/* Dirección */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="direccion"
                            className="font-semibold text-slate-800"
                        >
                            Dirección de la Iglesia:
                        </label>
                        <input
                            type="text"
                            id="direccion"
                            {...register("direccion")}
                            className="border border-slate-800 p-2 rounded text-slate-800"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.direccion?.message}
                        </p>
                    </div>

                    {/* Municipio */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="municipio"
                            className="font-semibold text-slate-800"
                        >
                            Municipio:
                        </label>
                        <input
                            type="text"
                            id="municipio"
                            {...register("municipio")}
                            className="border border-slate-800 p-2 rounded text-slate-800"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.municipio?.message}
                        </p>
                    </div>

                    {/* Provincia */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="provincia"
                            className="font-semibold text-slate-800"
                        >
                            Provincia:
                        </label>
                        <input
                            type="text"
                            id="provincia"
                            {...register("provincia")}
                            className="border border-slate-800 p-2 rounded text-slate-800"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.provincia?.message}
                        </p>
                    </div>

                    {/* Cantidad (Opcional) */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="cantidad"
                            className="font-semibold text-slate-800"
                        >
                            Cantidad de kits:
                        </label>
                        <input
                            type="number"
                            id="cantidad"
                            defaultValue={1}
                            {...register("cantidad", {
                                valueAsNumber: true,
                                min: 1,
                            })}
                            className="border border-slate-800 p-2 rounded text-slate-800"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.cantidad?.message}
                        </p>
                    </div>

                    {/* Cargo (Opcional) */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="cargo"
                            className="font-semibold text-slate-800"
                        >
                            Cargo o responsabilidad (si tiene):
                        </label>
                        <input
                            type="text"
                            id="cargo"
                            {...register("cargo")}
                            className="border border-slate-800 p-2 rounded text-slate-800"
                        />
                    </div>

                    {/* Botón de Enviar */}
                    <button
                        type="submit"
                        disabled={enviando}
                        className={`py-2 px-4 rounded transition 
    ${
        enviando
            ? "bg-slate-600 cursor-not-allowed"
            : "bg-slate-800 hover:bg-slate-900"
    } 
    text-white`}
                    >
                        {enviando ? "Enviando..." : "Enviar Registro"}
                    </button>

                    {/* Mensaje de éxito */}
                    {successMessage && (
                        <p className="mt-4 text-slate-900 font-semibold text-center">
                            {successMessage}
                        </p>
                    )}
                </form>
            </div>
        </>
    );
}
