import { z } from "zod";
import { isAdult } from "./utils";

export const checkoutSchema = z
  .object({
    fullLegalName: z.string().min(2),
    dateOfBirth: z.string().refine((value) => isAdult(value), "Customer must be 18 or older."),
    phone: z.string().min(7),
    email: z.string().email(),
    idNumber: z.string().optional(),
    address: z.string().min(8),
    city: z.string().min(2),
    acceptedAdultTerms: z.literal(true),
    acceptedTerms: z.literal(true),
  })
  .strict();

export const paystackInitializeSchema = z.object({
  orderId: z.string().min(3),
  email: z.string().email(),
  amount: z.number().positive(),
});
