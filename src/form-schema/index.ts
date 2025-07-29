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

export const signUpSchema = z
	.object({
		fullName: z
			.string("Enter your name")
			.nonempty("Name can not be empty")
			.min(3, "Min length is 3")
			.max(40, "Max length is 40")
			.trim(),
		email: z
			.string("Email is required")
			.nonempty("Please provide a valid email")
			.trim(),
		password: z
			.string()
			.nonempty("Password can not be empty")
			.min(6, "Min length is 6")
			.max(30, "Max length is 30")
			.regex(/[a-zA-Z]/, "Password must contain at least one letter")
			.regex(/\d/, "Password must contain at least one number")
			.regex(
				/[!@#$%^&*(),.?":{}|<>]/,
				"Password must contain at least one special character"
			)
			.trim(),
		confirmPassword: z.string().trim(),
	})
	.superRefine((arg, ctx) => {
		if (arg.password !== arg.confirmPassword) {
			ctx.addIssue({
				code: "custom",
				message: "Password does not match",
				path: ["confirmPassword"],
			});
		}
	});
