DO $$ BEGIN
  CREATE TYPE "public"."document_category" AS ENUM(
    'lab_results',
    'imaging',
    'prescriptions',
    'visit_notes',
    'insurance',
    'other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."user_role" AS ENUM('patient_account', 'practitioner');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."care_share_status" AS ENUM('pending', 'active', 'revoked');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "user_profiles"
  ADD COLUMN IF NOT EXISTS "role" "user_role" DEFAULT 'patient_account' NOT NULL;

ALTER TABLE "user_profiles"
  ADD COLUMN IF NOT EXISTS "email" text;

ALTER TABLE "documents"
  ADD COLUMN IF NOT EXISTS "category" "document_category" DEFAULT 'other' NOT NULL;

CREATE TABLE IF NOT EXISTS "document_extractions" (
  "document_id" uuid PRIMARY KEY NOT NULL REFERENCES "documents"("id") ON DELETE cascade,
  "document_type" text,
  "report_date" date,
  "collection_date" date,
  "summary" text,
  "attention_note" text,
  "extracted_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "document_access_logs" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "document_id" uuid NOT NULL REFERENCES "documents"("id") ON DELETE cascade,
  "accessed_by_user_id" text NOT NULL,
  "access_type" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "document_access_logs_document_id_idx"
  ON "document_access_logs" ("document_id");

CREATE INDEX IF NOT EXISTS "document_access_logs_user_id_idx"
  ON "document_access_logs" ("accessed_by_user_id");

CREATE TABLE IF NOT EXISTS "care_shares" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "patient_id" uuid NOT NULL REFERENCES "patients"("id") ON DELETE cascade,
  "granted_by_user_id" text NOT NULL,
  "provider_email" text NOT NULL,
  "granted_to_user_id" text,
  "status" "care_share_status" DEFAULT 'pending' NOT NULL,
  "message" text,
  "expires_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "care_shares_patient_id_idx"
  ON "care_shares" ("patient_id");

CREATE INDEX IF NOT EXISTS "care_shares_provider_email_idx"
  ON "care_shares" ("provider_email");

CREATE INDEX IF NOT EXISTS "care_shares_granted_to_user_id_idx"
  ON "care_shares" ("granted_to_user_id");
