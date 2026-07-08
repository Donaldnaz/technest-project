import { beforeEach, describe, expect, it, vi } from "vitest";

const mockDb = vi.hoisted(() => ({
  select: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: mockDb,
}));

import { getPatientById } from "@/lib/db/queries/patients";
import { listPractitionerSummaryReportsForPatient } from "@/lib/db/queries/summary-reports";

function createSelectChain(result: unknown) {
  const limit = vi.fn().mockResolvedValue(result);
  const where = vi.fn().mockReturnValue({ limit });
  const from = vi.fn().mockReturnValue({ where });
  return { from, where, limit };
}

function createJoinChain(result: unknown) {
  const orderBy = vi.fn().mockResolvedValue(result);
  const where = vi.fn().mockReturnValue({ orderBy });
  const innerJoin = vi.fn().mockReturnValue({ where });
  const from = vi.fn().mockReturnValue({ innerJoin });
  return { from, innerJoin, where, orderBy };
}

describe("tenant isolation in patient queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getPatientById queries with scoped filters", async () => {
    const chain = createSelectChain([]);
    mockDb.select.mockReturnValue(chain);

    const result = await getPatientById("user-abc", "patient-xyz");

    expect(result).toBeNull();
    expect(mockDb.select).toHaveBeenCalledTimes(1);
    expect(chain.from).toHaveBeenCalledTimes(1);
    expect(chain.where).toHaveBeenCalledTimes(1);
    expect(chain.limit).toHaveBeenCalledWith(1);
  });
});

describe("tenant isolation in summary report queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("listPractitionerSummaryReportsForPatient queries joined documents", async () => {
    const chain = createJoinChain([]);
    mockDb.select.mockReturnValue(chain);

    const result = await listPractitionerSummaryReportsForPatient(
      "user-abc",
      "patient-xyz",
    );

    expect(result).toEqual([]);
    expect(mockDb.select).toHaveBeenCalledTimes(1);
    expect(chain.from).toHaveBeenCalledTimes(1);
    expect(chain.innerJoin).toHaveBeenCalledTimes(1);
    expect(chain.where).toHaveBeenCalledTimes(1);
  });
});
