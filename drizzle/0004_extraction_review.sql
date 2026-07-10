CREATE TYPE "public"."extraction_review_status" AS ENUM('pending_review', 'approved', 'rejected');--> statement-breakpoint
ALTER TABLE "document_extractions" ADD COLUMN "plain_language_report" text;--> statement-breakpoint
ALTER TABLE "document_extractions" ADD COLUMN "key_findings" jsonb;--> statement-breakpoint
ALTER TABLE "document_extractions" ADD COLUMN "review_status" "extraction_review_status" DEFAULT 'pending_review' NOT NULL;--> statement-breakpoint
ALTER TABLE "document_extractions" ADD COLUMN "reviewed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "document_extractions" ADD COLUMN "reviewed_by" text;--> statement-breakpoint
ALTER TABLE "document_extractions" ADD COLUMN "reviewer_notes" text;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "summary_generation_requested_at" timestamp with time zone;--> statement-breakpoint
UPDATE "document_extractions" SET "review_status" = 'approved' WHERE "summary" IS NOT NULL AND trim("summary") <> '';
