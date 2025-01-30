/*
  Warnings:

  - You are about to drop the column `xp` on the `UserXp` table. All the data in the column will be lost.
  - You are about to drop the column `xpForNextLevel` on the `UserXp` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserXp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "textXp" INTEGER NOT NULL DEFAULT 0,
    "textXpForNextLevel" INTEGER NOT NULL DEFAULT 100,
    "voiceXp" INTEGER NOT NULL DEFAULT 0,
    "voiceXpForNextLevel" INTEGER NOT NULL DEFAULT 100,
    "level" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_UserXp" ("createdAt", "id", "level", "updatedAt", "userId") SELECT "createdAt", "id", "level", "updatedAt", "userId" FROM "UserXp";
DROP TABLE "UserXp";
ALTER TABLE "new_UserXp" RENAME TO "UserXp";
CREATE UNIQUE INDEX "UserXp_userId_key" ON "UserXp"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
