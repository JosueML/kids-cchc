import { PrismaClient } from "@prisma/client";
import { createId } from "@paralleldrive/cuid2";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Iniciando seed...");

    // ─── Usuarios ────────────────────────────────────────────────────────────────

    const passwordHash = await bcrypt.hash("admin1234", 10);

    await prisma.usuario.upsert({
        where: { email: "admin@kids.com" },
        update: {},
        create: {
            email: "admin@kids.com",
            password: passwordHash,
            nombre: "Administrador",
            rol: "admin",
        },
    });

    await prisma.usuario.upsert({
        where: { email: "editor@kids.com" },
        update: {},
        create: {
            email: "editor@kids.com",
            password: await bcrypt.hash("editor1234", 10),
            nombre: "Editor Principal",
            rol: "editor",
        },
    });

    console.log("✅ Usuarios creados");

    // ─── Entrenamientos ───────────────────────────────────────────────────────────

    //const entrenamientos =
    await Promise.all([
        prisma.entrenamiento.upsert({
            where: { id: "entrenamiento-seed-1" },
            update: {},
            create: {
                id: "entrenamiento-seed-1",
                entrenamiento: "Liderazgo Juvenil",
                fecha: new Date("2025-06-15T09:00:00"),
                iglesia: "Iglesia Central Asambleas de Dios",
                direccion: "Av. Simón Bolívar #123",
                municipio: "Libertador",
                provincia: "Caracas",
            },
        }),
        prisma.entrenamiento.upsert({
            where: { id: "entrenamiento-seed-2" },
            update: {},
            create: {
                id: "entrenamiento-seed-2",
                entrenamiento: "Formación de Maestros de Escuela Dominical",
                fecha: new Date("2025-07-20T10:00:00"),
                iglesia: "Iglesia Evangélica Betania",
                direccion: "Calle 5 con Av. Los Leones",
                municipio: "Chacao",
                provincia: "Miranda",
            },
        }),
        prisma.entrenamiento.upsert({
            where: { id: "entrenamiento-seed-3" },
            update: {},
            create: {
                id: "entrenamiento-seed-3",
                entrenamiento: "Taller de Predicación y Homilética",
                fecha: new Date("2025-08-10T08:30:00"),
                iglesia: "Centro Cristiano Nueva Vida",
                direccion: "Urb. La Isabelica, Manzana 12",
                municipio: "Valencia",
                provincia: "Carabobo",
            },
        }),
    ]);

    console.log("✅ Entrenamientos creados");

    // ─── Registros ────────────────────────────────────────────────────────────────

    const registrosSeed = [
        {
            slug: createId(),
            name: "María González",
            tel: "0414-1234567",
            email: "maria.gonzalez@email.com",
            ci: "V-12345678",
            iglesia: "Iglesia Central Asambleas de Dios",
            denominacion: "Asambleas de Dios",
            direccion: "Av. Bolívar, Edificio Torre A, Apt 3B",
            municipio: "Libertador",
            provincia: "Caracas",
            cargo: "Maestra",
            cantidad: 1,
            estado: "aprobado",
        },
        {
            slug: createId(),
            name: "Carlos Rodríguez",
            tel: "0424-9876543",
            email: "carlos.rodriguez@email.com",
            ci: "V-20123456",
            iglesia: "Iglesia Evangélica Betania",
            denominacion: "Evangélica",
            direccion: "Calle Real de Petare #45",
            municipio: "Sucre",
            provincia: "Miranda",
            cargo: "Pastor",
            cantidad: 3,
            estado: "aprobado",
        },
        {
            slug: createId(),
            name: "Ana Martínez",
            tel: "0416-5554433",
            email: null,
            ci: "V-15678901",
            iglesia: "Centro Cristiano Nueva Vida",
            denominacion: "Cristiana",
            direccion: "Urb. Trigal Norte, Calle 12 Casa 8",
            municipio: "Valencia",
            provincia: "Carabobo",
            cargo: "Líder de Jóvenes",
            cantidad: 5,
            estado: "pendiente",
        },
        {
            slug: createId(),
            name: "José Pérez",
            tel: "0412-3334455",
            email: "jose.perez@email.com",
            ci: "V-18234567",
            iglesia: "Iglesia Bautista El Redentor",
            denominacion: "Bautista",
            direccion: "Av. Las Delicias #210",
            municipio: "Maracay",
            provincia: "Aragua",
            cargo: null,
            cantidad: 2,
            estado: "pendiente",
        },
        {
            slug: createId(),
            name: "Luisa Fernández",
            tel: "0426-7778899",
            email: "luisa.fernandez@email.com",
            ci: "V-22345678",
            iglesia: "Iglesia Metodista Unida",
            denominacion: "Metodista",
            direccion: "Sector El Paraíso, Calle 3",
            municipio: "Barquisimeto",
            provincia: "Lara",
            cargo: "Directora de Escuela Dominical",
            cantidad: 4,
            estado: "rechazado",
        },
        {
            slug: createId(),
            name: "Pedro Morales",
            tel: "0418-2223344",
            email: null,
            ci: "V-16789012",
            iglesia: "Iglesia Presbiteriana Shalom",
            denominacion: "Presbiteriana",
            direccion: "Urb. El Ujano, Manzana 7 Casa 2",
            municipio: "Maturín",
            provincia: "Monagas",
            cargo: "Anciano",
            cantidad: 1,
            estado: "aprobado",
        },
    ];

    for (const registro of registrosSeed) {
        await prisma.registro.create({ data: registro });
    }

    console.log("✅ Registros creados");

    console.log(`
🎉 Seed completado exitosamente.

Usuarios disponibles:
  📧 admin@kids.com     🔑 admin1234   (rol: admin)
  📧 editor@kids.com    🔑 editor1234  (rol: editor)
  `);
}

main()
    .catch((e) => {
        console.error("❌ Error en seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
