-- CreateTable
CREATE TABLE "UserXp" (
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

-- CreateTable
CREATE TABLE "Tickets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "affaire" TEXT NOT NULL,
    "staffIdClaimed" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TicketsResolution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticketId" TEXT NOT NULL,
    "staffId" TEXT,
    "reason" TEXT NOT NULL,
    "closedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TicketsResolution_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Suggestions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Votes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "suggestionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vote" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Votes_suggestionId_fkey" FOREIGN KEY ("suggestionId") REFERENCES "Suggestions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Replic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "channelId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "participant1" TEXT,
    "participant2" TEXT,
    "participant3" TEXT,
    "participant4" TEXT,
    "replicStatus" INTEGER NOT NULL DEFAULT 0,
    "currentTurn" INTEGER NOT NULL DEFAULT 1,
    "winnerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ReplicVotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "replicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "voteFor" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ReplicVotes_replicId_fkey" FOREIGN KEY ("replicId") REFERENCES "Replic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Blacklist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PreApeals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "timeNeededToApeal" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Apeals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "textApealChannelId" TEXT NOT NULL,
    "voiceApealChannelId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pardons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserXp_userId_key" ON "UserXp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_authorId_key" ON "Tickets"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_messageId_key" ON "Tickets"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "Tickets_channelId_key" ON "Tickets"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "TicketsResolution_ticketId_key" ON "TicketsResolution"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "Suggestions_messageId_key" ON "Suggestions"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "PreApeals_userId_key" ON "PreApeals"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Apeals_userId_key" ON "Apeals"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Pardons_userId_key" ON "Pardons"("userId");
