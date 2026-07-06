CREATE TYPE "document_status" AS ENUM('uploaded', 'processing', 'ready', 'failed');

CREATE TABLE "patients" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text NOT NULL,
  "first_name" text NOT NULL,
  "last_name" text NOT NULL,
  "date_of_birth" date,
  "medical_record_number" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "documents" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "patient_id" uuid NOT NULL,
  "user_id" text NOT NULL,
  "blob_url" text NOT NULL,
  "blob_pathname" text NOT NULL,
  "file_name" text NOT NULL,
  "mime_type" text NOT NULL,
  "file_size_bytes" bigint,
  "status" "document_status" DEFAULT 'uploaded' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "documents" ADD CONSTRAINT "documents_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;

CREATE INDEX "patients_user_id_idx" ON "patients" USING btree ("user_id");
CREATE INDEX "patients_user_id_created_at_idx" ON "patients" USING btree ("user_id","created_at");
CREATE UNIQUE INDEX "patients_user_mrn_unique" ON "patients" USING btree ("user_id","medical_record_number");
CREATE INDEX "documents_patient_id_idx" ON "documents" USING btree ("patient_id");
CREATE INDEX "documents_user_id_idx" ON "documents" USING btree ("user_id");
