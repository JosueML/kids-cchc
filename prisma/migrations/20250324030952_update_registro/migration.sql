/*
  Warnings:

  - Added the required column `denominacion` to the `Registro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipio` to the `Registro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provincia` to the `Registro` table without a default value. This is not possible if the table is not empty.

*/
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
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Registro" ("cargo", "ci", "createdAt", "direccion", "email", "estado", "id", "iglesia", "name", "tel") SELECT "cargo", "ci", "createdAt", "direccion", "email", "estado", "id", "iglesia", "name", "tel" FROM "Registro";
DROP TABLE "Registro";
ALTER TABLE "new_Registro" RENAME TO "Registro";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
