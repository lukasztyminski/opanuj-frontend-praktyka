import { z } from 'zod';

export const flightDateFormat = /^\d{2}-\d{2}-\d{4}$/;

export const FlightFormSchema = z
  .object({
    origin: z.string().trim().min(1, 'Origin must be filled'),
    destination: z.string().trim().min(1, 'Destination must be filled'),
    trip: z.enum(['one-way', 'round-trip'], {
      errorMap: () => ({
        message: 'Trip must be either "one-way" or "round-trip"',
      }),
    }),
    startDate: z.string().refine((value) => flightDateFormat.test(value), {
      message: 'Start date must match DD-MM-YYYY',
    }),
    endDate: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.trip === 'round-trip') {
      if (!data.endDate?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['endDate'],
          message: 'Return date is required for round trip',
        });
      } else if (!flightDateFormat.test(data.endDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['endDate'],
          message: 'Return date must match DD-MM-YYYY',
        });
      }
    }
  });

export type FlightFormFields = z.infer<typeof FlightFormSchema>;
