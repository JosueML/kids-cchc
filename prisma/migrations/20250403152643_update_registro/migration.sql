/*
  Warnings:

  - The primary key for the `Registro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Registro` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `slug` to the `Registro` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Registro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
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
INSERT INTO "new_Registro" ("cantidad", "cargo", "ci", "createdAt", "denominacion", "direccion", "email", "estado", "id", "iglesia", "municipio", "name", "provincia", "tel") SELECT "cantidad", "cargo", "ci", "createdAt", "denominacion", "direccion", "email", "estado", "id", "iglesia", "municipio", "name", "provincia", "tel" FROM "Registro";
DROP TABLE "Registro";
ALTER TABLE "new_Registro" RENAME TO "Registro";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
