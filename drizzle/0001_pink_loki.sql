CREATE TABLE IF NOT EXISTS "password_reset_token" (
	"identifier" text NOT NULL,
	"email" text NOT NULL,
	"expires" timestamp NOT NULL,
	"token" text NOT NULL,
	CONSTRAINT "password_reset_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
