-- CreateTable
CREATE TABLE "webinar_registrations" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webinar_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "webinar_registrations_email_key" ON "webinar_registrations"("email");

-- CreateIndex
CREATE INDEX "webinar_registrations_email_idx" ON "webinar_registrations"("email");
