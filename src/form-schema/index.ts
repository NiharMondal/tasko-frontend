import z from "zod";

export const loginSchema = z.object({
	email: z
		.string("Email is required")
		.nonempty("Please provide a valid email")
		.trim(),
	password: z
		.string()
		.min(6, "Min length is 6")
		.max(30, "Max length is 30")
		.regex(/[a-zA-Z]/, "Password must contain at least one letter")
		.regex(/\d/, "Password must contain at least one number")
		.regex(
			/[!@#$%^&*(),.?":{}|<>]/,
			"Password must contain at least one special character"
		)
		.trim(),
	rememberMe: z.boolean().default(true).optional(),
});
