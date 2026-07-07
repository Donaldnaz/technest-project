import { relations } from "drizzle-orm";

import {
  careShares,
  clients,
  documentAccessLogs,
  documentExtractions,
  documents,
  ingestDocuments,
  patients,
} from "@/lib/db/schema";

export const patientsRelations = relations(patients, ({ many }) => ({
  documents: many(documents),
  careShares: many(careShares),
}));

export const documentsRelations = relations(documents, ({ one, many }) => ({
  patient: one(patients, {
    fields: [documents.patientId],
    references: [patients.id],
  }),
  extraction: one(documentExtractions, {
    fields: [documents.id],
    references: [documentExtractions.documentId],
  }),
  accessLogs: many(documentAccessLogs),
}));

export const documentExtractionsRelations = relations(
  documentExtractions,
  ({ one }) => ({
    document: one(documents, {
      fields: [documentExtractions.documentId],
      references: [documents.id],
    }),
  }),
);

export const careSharesRelations = relations(careShares, ({ one }) => ({
  patient: one(patients, {
    fields: [careShares.patientId],
    references: [patients.id],
  }),
}));

export const clientsRelations = relations(clients, ({ many }) => ({
  documents: many(ingestDocuments),
}));

export const ingestDocumentsRelations = relations(ingestDocuments, ({ one }) => ({
  client: one(clients, {
    fields: [ingestDocuments.clientId],
    references: [clients.id],
  }),
}));
