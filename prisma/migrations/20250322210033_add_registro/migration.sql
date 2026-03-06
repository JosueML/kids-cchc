-- CreateTable
CREATE TABLE "Registro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "email" TEXT,
    "ci" TEXT NOT NULL,
    "iglesia" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "cargo" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
