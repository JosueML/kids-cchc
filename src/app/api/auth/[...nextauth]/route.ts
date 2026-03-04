import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo", type: "email" },
                password: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.usuario.findUnique({
                    where: { email: credentials?.email },
                });

                if (user && credentials?.password) {
                    const isValid = await compare(
                        credentials.password,
                        user.password
                    );
                    if (isValid) return user;
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };
