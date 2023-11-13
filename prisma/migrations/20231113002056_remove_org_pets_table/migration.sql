/*
  Warnings:

  - You are about to drop the `orgs_pets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orgId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs_pets" DROP CONSTRAINT "orgs_pets_orgId_fkey";

-- DropForeignKey
ALTER TABLE "orgs_pets" DROP CONSTRAINT "orgs_pets_petId_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "orgId" TEXT NOT NULL;

-- DropTable
DROP TABLE "orgs_pets";

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
