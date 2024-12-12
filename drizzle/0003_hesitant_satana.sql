CREATE TABLE IF NOT EXISTS "two_factor_token" (
	"id" text DEFAULT gen_random_uuid(),
	"email" text,
	"token" text,
	"expiredAt" timestamp,
	CONSTRAINT "two_factor_token_email_token_unique" UNIQUE("email","token")
);
