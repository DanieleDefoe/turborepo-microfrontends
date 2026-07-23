import { describe, expect, it } from "vitest";
import { z } from "zod";

import { resolveSystemConfigValue } from "../use-system-config";

const schema = z.object({
  font: z.string(),
  theme: z.enum(["light", "dark"]),
});

const fallback = {
  font: "inter",
  theme: "light",
} as const;

describe("resolveSystemConfigValue", () => {
  it("parses valid config JSON", () => {
    expect(
      resolveSystemConfigValue(
        JSON.stringify({ font: "system", theme: "dark" }),
        schema,
        fallback
      )
    ).toEqual({
      font: "system",
      theme: "dark",
    });
  });

  it("falls back for invalid JSON", () => {
    expect(resolveSystemConfigValue("{invalid", schema, fallback)).toEqual(
      fallback
    );
  });

  it("falls back for schema mismatch", () => {
    expect(
      resolveSystemConfigValue(
        JSON.stringify({ font: "system", theme: "sepia" }),
        schema,
        fallback
      )
    ).toEqual(fallback);
  });
});
