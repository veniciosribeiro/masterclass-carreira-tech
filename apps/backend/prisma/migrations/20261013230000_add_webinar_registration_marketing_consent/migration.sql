-- AlterTable
ALTER TABLE "webinar_registrations" ADD COLUMN "marketing_consent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "marketing_consent_at" TIMESTAMPTZ,
ADD COLUMN "privacy_policy_version" TEXT;
