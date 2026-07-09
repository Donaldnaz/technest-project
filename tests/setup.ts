process.env.SKIP_ENV_VALIDATION = "true";
process.env.DATABASE_URL ??=
  "postgresql://placeholder:placeholder@localhost:5432/placeholder";
process.env.NEON_AUTH_BASE_URL ??= "https://placeholder.invalid/auth";
process.env.NEON_AUTH_COOKIE_SECRET ??=
  "test-cookie-secret-minimum-32-characters";
process.env.BLOB_READ_WRITE_TOKEN ??=
  "vercel_blob_rw_teststore_secrettoken";

import { vi } from "vitest";

vi.mock("server-only", () => ({}));
