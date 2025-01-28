-- CreateTable
CREATE TABLE "UserXp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "xpForNextLevel" INTEGER NOT NULL DEFAULT 100,
    "level" INTEGER NOT NULL DEFAULT 1,
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
