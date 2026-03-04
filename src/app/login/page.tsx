"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.ok) {
            window.location.href = "/admin"; // redirige donde desees
        } else {
            setError("Correo o contraseña incorrectos");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded-md shadow-sm space-y-4 bg-white text-slate-800">
            <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        required
                        className="w-full border px-3 py-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        required
                        className="w-full border px-3 py-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-700"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
