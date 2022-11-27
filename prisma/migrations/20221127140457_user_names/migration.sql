/*
  Warnings:

  - Added the required column `nameFirst` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameLast` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nameFirst" TEXT NOT NULL,
ADD COLUMN     "nameLast" TEXT NOT NULL;
