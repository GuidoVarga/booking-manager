import type { ZodSchema } from "zod"

export function expectZodError(
  schema: ZodSchema,
  data: unknown,
  field: string,
  message: string,
) {
  const result = schema.safeParse(data)

  expect(result.success).toBe(false)

  if (!result.success) {
    expect(result.error.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: expect.arrayContaining([field]), message }),
      ]),
    )
  }
}
