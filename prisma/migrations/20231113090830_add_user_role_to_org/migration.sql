-- CreateEnum
CREATE TYPE "USER_ROLES" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "role" "USER_ROLES" NOT NULL DEFAULT 'admin';
