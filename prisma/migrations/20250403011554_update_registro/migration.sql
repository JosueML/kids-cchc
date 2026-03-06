-- CreateTable
CREATE TABLE "Entrenamiento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entrenamiento" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "iglesia" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Registro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "email" TEXT,
    "ci" TEXT NOT NULL,
    "iglesia" TEXT NOT NULL,
    "denominacion" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "cargo" TEXT,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Registro" ("cargo", "ci", "createdAt", "denominacion", "direccion", "email", "estado", "id", "iglesia", "municipio", "name", "provincia", "tel") SELECT "cargo", "ci", "createdAt", "denominacion", "direccion", "email", "estado", "id", "iglesia", "municipio", "name", "provincia", "tel" FROM "Registro";
DROP TABLE "Registro";
ALTER TABLE "new_Registro" RENAME TO "Registro";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
