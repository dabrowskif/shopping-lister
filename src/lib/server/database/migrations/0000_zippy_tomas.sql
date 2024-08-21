CREATE TABLE IF NOT EXISTS "shopping-lister"."recipes" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"ownerId" uuid NOT NULL,
	"name" varchar(256) NOT NULL,
	"ingredient" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopping-lister"."shoppingLists" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"ownerId" uuid NOT NULL,
	"name" varchar(256) NOT NULL,
	"ingredient" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"confirmed_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping-lister"."recipes" ADD CONSTRAINT "recipes_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping-lister"."shoppingLists" ADD CONSTRAINT "shoppingLists_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
