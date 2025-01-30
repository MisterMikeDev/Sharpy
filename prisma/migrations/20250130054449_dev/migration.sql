/*
  Warnings:

  - You are about to drop the column `level` on the `UserXp` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserXp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "textXp" INTEGER NOT NULL DEFAULT 0,
    "textXpForNextLevel" INTEGER NOT NULL DEFAULT 100,
    "voiceXp" INTEGER NOT NULL DEFAULT 0,
    "voiceXpForNextLevel" INTEGER NOT NULL DEFAULT 50,
    "textLevel" INTEGER NOT NULL DEFAULT 0,
    "voiceLevel" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_UserXp" ("createdAt", "id", "textXp", "textXpForNextLevel", "updatedAt", "userId", "voiceXp", "voiceXpForNextLevel") SELECT "createdAt", "id", "textXp", "textXpForNextLevel", "updatedAt", "userId", "voiceXp", "voiceXpForNextLevel" FROM "UserXp";
DROP TABLE "UserXp";
ALTER TABLE "new_UserXp" RENAME TO "UserXp";
CREATE UNIQUE INDEX "UserXp_userId_key" ON "UserXp"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
