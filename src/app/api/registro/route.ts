import { prisma } from "@/lib/prisma";
import { createId } from "@paralleldrive/cuid2";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const nuevoRegistro = await prisma.registro.create({
            data: {
                slug: createId(),
                name: data.name,
                tel: data.tel,
                email: data.email || null,
                ci: data.ci,
                iglesia: data.iglesia,
                denominacion: data.denominacion,
                direccion: data.direccion,
                municipio: data.municipio,
                provincia: data.provincia,
                cantidad: data.cantidad,
                cargo: data.cargo || null,
            },
        });

        // 📬 Datos para el envío de correo
        const logoUrl =
            process.env.MINISTERIO_LOGO ||
            "http://localhost:3000/img/logos/chk.svg";
        // const appUrl = process.env.APP_URL || "https://miapp.com";
        const correoInterno =
            process.env.CONTACT_EMAIL || "registro@ministerio.org";
        const correoAdminCC = process.env.ADMIN_EMAIL || "admin@ministerio.org";
        // const enlace = `${appUrl}/solicitud/${nuevoRegistro.id}`;

        // ✉️ Configurar transporte SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false, // 👈 esta línea permite certificados autofirmados
            },
        });

        // 📥 Correo interno al equipo
        await transporter.sendMail({
            from: `"Formulario Web" <${process.env.SMTP_USER}>`,
            to: correoInterno,
            cc: correoAdminCC,
            subject: "📥 Nueva solicitud recibida",
            html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f9fafb; color: #1e293b;">
          <img src="${logoUrl}" alt="Logo Ministerio"   style="width: 120px; height: auto; margin-bottom: 20px;"/>

          <h2 style="color: #0f172a;">📥 Nueva solicitud recibida</h2>
          <p><strong>ID:</strong> ${nuevoRegistro.id}</p>
          <p><strong>Cod:</strong> <a href=${process.env.APP_URL}/${
                nuevoRegistro.slug
            }> CHKEBV${nuevoRegistro.id.toString().padStart(3, "0")} </a></p>
          <p><strong>Nombre:</strong> ${nuevoRegistro.name}</p>
          <p><strong>Teléfono:</strong> ${nuevoRegistro.tel}</p>
          <p><strong>CI:</strong> ${nuevoRegistro.ci}</p>
          <p><strong>Iglesia:</strong> ${nuevoRegistro.iglesia}</p>
          <p><strong>Denominación:</strong> ${nuevoRegistro.denominacion}</p>
          <p><strong>Dirección:</strong> ${nuevoRegistro.direccion}</p>
          <p><strong>Municipio:</strong> ${nuevoRegistro.municipio}</p>
          <p><strong>Provincia:</strong> ${nuevoRegistro.provincia}</p>
          <p><strong>Cargo:</strong> ${nuevoRegistro.cargo ?? "N/A"}</p>
          <p><strong>Cantidad:</strong> ${nuevoRegistro.cantidad ?? "1"}</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
      `,
        });

        // 📧 Correo al usuario (si proporcionó email)
        if (nuevoRegistro.email) {
            await transporter.sendMail({
                from: `"Cada Hogar Kids" <${process.env.SMTP_USER}>`,
                to: nuevoRegistro.email,
                subject: "✅ Hemos recibido tu solicitud",
                html: `
          <div style="font-family: sans-serif; padding: 20px; background-color: #f9fafb; color: #1e293b;">
            <img src="${logoUrl}" alt="Logo Ministerio" style="width: 120px; height: auto; margin-bottom: 20px;" />

            <h2 style="color: #0f172a;">¡Gracias por realizar su prereserva!</h2>
            <p>Hola <strong>${nuevoRegistro.name}</strong>,</p>
            <p>Hemos recibido tu solicitud correctamente.</p>

            <p style="margin-top: 30px;">Dios le bendiga,<br><strong>El equipo de Cada Hogar Kids</strong></p>
          </div>
        `,
            });
        }

        return Response.json({ success: true, id: nuevoRegistro.id });
    } catch (error) {
        console.error("❌ Error al crear el registro:", error);
        return new Response(
            JSON.stringify({ error: "Error al registrar los datos." }),
            { status: 500 }
        );
    }
}
