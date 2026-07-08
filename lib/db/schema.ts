import {
  bigint,
  date,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const documentStatusEnum = pgEnum("document_status", [
  "uploaded",
  "processing",
  "ready",
  "failed",
]);

export const documentCategoryEnum = pgEnum("document_category", [
  "lab_results",
  "imaging",
  "prescriptions",
  "visit_notes",
  "insurance",
  "other",
]);

export const patientRelationshipEnum = pgEnum("patient_relationship", [
  "self",
  "other",
]);

export const userRoleEnum = pgEnum("user_role", [
  "patient_account",
  "practitioner",
]);

export const careShareStatusEnum = pgEnum("care_share_status", [
  "pending",
  "active",
  "revoked",
]);

export const userProfiles = pgTable("user_profiles", {
  userId: text("user_id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: userRoleEnum("role").default("patient_account").notNull(),
  email: text("email"),
  onboardingCompletedAt: timestamp("onboarding_completed_at", {
    withTimezone: true,
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const patients = pgTable(
  "patients",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    dateOfBirth: date("date_of_birth"),
    medicalRecordNumber: text("medical_record_number"),
    relationship: patientRelationshipEnum("relationship")
      .default("other")
      .notNull(),
    healthcareSpecialty: text("healthcare_specialty").notNull(),
    healthcareLocation: text("healthcare_location").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    country: text("country").notNull(),
    healthQuarter: text("health_quarter").notNull(),
    additionalNotes: text("additional_notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("patients_user_id_idx").on(table.userId),
    index("patients_user_id_created_at_idx").on(table.userId, table.createdAt),
    uniqueIndex("patients_user_mrn_unique").on(
      table.userId,
      table.medicalRecordNumber,
    ),
  ],
);

export const documents = pgTable(
  "documents",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
    blobUrl: text("blob_url").notNull(),
    blobPathname: text("blob_pathname").notNull(),
    fileName: text("file_name").notNull(),
    mimeType: text("mime_type").notNull(),
    fileSizeBytes: bigint("file_size_bytes", { mode: "number" }),
    category: documentCategoryEnum("category").default("other").notNull(),
    status: documentStatusEnum("status").default("uploaded").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("documents_patient_id_idx").on(table.patientId),
    index("documents_user_id_idx").on(table.userId),
  ],
);

export const documentExtractions = pgTable(
  "document_extractions",
  {
    documentId: uuid("document_id")
      .primaryKey()
      .references(() => documents.id, { onDelete: "cascade" }),
    documentType: text("document_type"),
    reportDate: date("report_date"),
    collectionDate: date("collection_date"),
    summary: text("summary"),
    attentionNote: text("attention_note"),
    extractedAt: timestamp("extracted_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
);

export const documentAccessLogs = pgTable(
  "document_access_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),
    accessedByUserId: text("accessed_by_user_id").notNull(),
    accessType: text("access_type").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("document_access_logs_document_id_idx").on(table.documentId),
    index("document_access_logs_user_id_idx").on(table.accessedByUserId),
  ],
);

export const careShares = pgTable(
  "care_shares",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    grantedByUserId: text("granted_by_user_id").notNull(),
    providerEmail: text("provider_email").notNull(),
    grantedToUserId: text("granted_to_user_id"),
    status: careShareStatusEnum("status").default("pending").notNull(),
    message: text("message"),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("care_shares_patient_id_idx").on(table.patientId),
    index("care_shares_provider_email_idx").on(table.providerEmail),
    index("care_shares_granted_to_user_id_idx").on(table.grantedToUserId),
  ],
);

export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;
export type Patient = typeof patients.$inferSelect;
export type NewPatient = typeof patients.$inferInsert;
export type Document = typeof documents.$inferSelect;
export type DocumentExtraction = typeof documentExtractions.$inferSelect;
export type DocumentAccessLog = typeof documentAccessLogs.$inferSelect;
export type CareShare = typeof careShares.$inferSelect;
