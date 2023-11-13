/*
  Warnings:

  - You are about to drop the `people` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_orgId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_peopleId_fkey";

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "people";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "USERS_ROLES";
