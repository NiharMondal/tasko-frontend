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

export const createTodoSchema = z.object({
	category: z
		.string("Category is required")
		.nonempty("Category can not be empty")
		.trim(),
	status: z.enum(["ongoing", "pending", "collaborative", "done"]).optional(),
	endDate: z.string().nonempty("Date can not be empty"),
	description: z
		.string()
		.min(10, "Min length is 10")
		.max(100, "Max length is 100"),
});
export const editTodo = z.object({
	category: z
		.string("Category is required")
		.nonempty("Category can not be empty")
		.trim()
		.optional(),
	status: z.string().optional(),
	endDate: z.string().nonempty("Date can not be empty").optional(),
	description: z
		.string()
		.min(10, "Min length is 10")
		.max(100, "Max length is 100")
		.optional(),
});
