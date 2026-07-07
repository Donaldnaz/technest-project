DO $$ BEGIN
  CREATE TYPE "public"."ingest_category_tag" AS ENUM(
    'lab',
    'prescription',
    'imaging',
    'insurance',
    'other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "clients" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "full_name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text NOT NULL,
  "date_of_birth" date,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "clients_email_idx" ON "clients" USING btree ("email");
CREATE INDEX IF NOT EXISTS "clients_created_at_idx" ON "clients" USING btree ("created_at");

CREATE TABLE IF NOT EXISTS "ingest_documents" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "client_id" uuid NOT NULL,
  "file_name" text NOT NULL,
  "vercel_blob_url" text NOT NULL,
  "file_size" bigint NOT NULL,
  "category_tag" "ingest_category_tag" DEFAULT 'other' NOT NULL,
  "uploaded_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "ingest_documents"
  ADD CONSTRAINT "ingest_documents_client_id_clients_id_fk"
  FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id")
  ON DELETE cascade ON UPDATE no action;

CREATE INDEX IF NOT EXISTS "ingest_documents_client_id_idx" ON "ingest_documents" USING btree ("client_id");
CREATE INDEX IF NOT EXISTS "ingest_documents_uploaded_at_idx" ON "ingest_documents" USING btree ("uploaded_at");
