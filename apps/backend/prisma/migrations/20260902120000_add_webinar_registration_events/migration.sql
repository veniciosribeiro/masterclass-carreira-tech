CREATE TABLE "webinar_registration_events" (
    "id" UUID NOT NULL,
    "registration_id" UUID NOT NULL,
    "event_name" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "next_attempt_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_error" TEXT,
    "sent_at" TIMESTAMPTZ,
    "locked_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webinar_registration_events_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "webinar_registration_events_status_next_attempt_at_idx"
ON "webinar_registration_events"("status", "next_attempt_at");

CREATE INDEX "webinar_registration_events_registration_id_idx"
ON "webinar_registration_events"("registration_id");

ALTER TABLE "webinar_registration_events"
ADD CONSTRAINT "webinar_registration_events_registration_id_fkey"
FOREIGN KEY ("registration_id") REFERENCES "webinar_registrations"("id")
ON DELETE CASCADE ON UPDATE CASCADE;