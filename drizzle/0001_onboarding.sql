CREATE TYPE "patient_relationship" AS ENUM('self', 'other');

CREATE TABLE "user_profiles" (
  "user_id" text PRIMARY KEY NOT NULL,
  "first_name" text NOT NULL,
  "last_name" text NOT NULL,
  "onboarding_completed_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "patients" ADD COLUMN "relationship" "patient_relationship" DEFAULT 'other' NOT NULL;
ALTER TABLE "patients" ADD COLUMN "healthcare_specialty" text;
ALTER TABLE "patients" ADD COLUMN "healthcare_location" text;
ALTER TABLE "patients" ADD COLUMN "city" text;
ALTER TABLE "patients" ADD COLUMN "state" text;
ALTER TABLE "patients" ADD COLUMN "country" text;
ALTER TABLE "patients" ADD COLUMN "health_quarter" text;
ALTER TABLE "patients" ADD COLUMN "additional_notes" text;

UPDATE "patients" SET
  "healthcare_specialty" = 'Primary care',
  "healthcare_location" = 'Not specified',
  "city" = 'Not specified',
  "state" = 'California',
  "country" = 'United States',
  "health_quarter" = 'Other California region'
WHERE "healthcare_specialty" IS NULL;

ALTER TABLE "patients" ALTER COLUMN "healthcare_specialty" SET NOT NULL;
ALTER TABLE "patients" ALTER COLUMN "healthcare_location" SET NOT NULL;
ALTER TABLE "patients" ALTER COLUMN "city" SET NOT NULL;
ALTER TABLE "patients" ALTER COLUMN "state" SET NOT NULL;
ALTER TABLE "patients" ALTER COLUMN "country" SET NOT NULL;
ALTER TABLE "patients" ALTER COLUMN "health_quarter" SET NOT NULL;
