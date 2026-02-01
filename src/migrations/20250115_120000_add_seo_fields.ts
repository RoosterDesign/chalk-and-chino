import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
        -- Add SEO fields to pages table
        ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
        ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
        ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "meta_image_id" integer;
        ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "meta_keywords" varchar;
        ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "meta_preview" jsonb;

        -- Add SEO fields to pages version table
        ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_meta_title" varchar;
        ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_meta_description" varchar;
        ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_meta_image_id" integer;
        ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_meta_keywords" varchar;
        ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_meta_preview" jsonb;

        -- Add SEO fields to products table
        ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
        ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
        ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "meta_image_id" integer;
        ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "meta_keywords" varchar;
        ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "meta_preview" jsonb;

        -- Add SEO fields to products version table
        ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_meta_title" varchar;
        ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_meta_description" varchar;
        ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_meta_image_id" integer;
        ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_meta_keywords" varchar;
        ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_meta_preview" jsonb;

        -- Add SEO fields to product_categories table
        ALTER TABLE "product_categories" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
        ALTER TABLE "product_categories" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
        ALTER TABLE "product_categories" ADD COLUMN IF NOT EXISTS "meta_image_id" integer;
        ALTER TABLE "product_categories" ADD COLUMN IF NOT EXISTS "meta_keywords" varchar;
        ALTER TABLE "product_categories" ADD COLUMN IF NOT EXISTS "meta_preview" jsonb;

        -- Add foreign key constraints for meta_image_id
        DO $$ BEGIN
            ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;

        DO $$ BEGIN
            ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;

        DO $$ BEGIN
            ALTER TABLE "products" ADD CONSTRAINT "products_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;

        DO $$ BEGIN
            ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;

        DO $$ BEGIN
            ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
            WHEN duplicate_object THEN null;
        END $$;

        -- Add indexes for SEO fields
        CREATE INDEX IF NOT EXISTS "pages_meta_title_idx" ON "pages" USING btree ("meta_title");
        CREATE INDEX IF NOT EXISTS "pages_meta_image_idx" ON "pages" USING btree ("meta_image_id");
        CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_title_idx" ON "_pages_v" USING btree ("version_meta_title");
        CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
        CREATE INDEX IF NOT EXISTS "products_meta_title_idx" ON "products" USING btree ("meta_title");
        CREATE INDEX IF NOT EXISTS "products_meta_image_idx" ON "products" USING btree ("meta_image_id");
        CREATE INDEX IF NOT EXISTS "_products_v_version_meta_title_idx" ON "_products_v" USING btree ("version_meta_title");
        CREATE INDEX IF NOT EXISTS "_products_v_version_meta_image_idx" ON "_products_v" USING btree ("version_meta_image_id");
        CREATE INDEX IF NOT EXISTS "product_categories_meta_title_idx" ON "product_categories" USING btree ("meta_title");
        CREATE INDEX IF NOT EXISTS "product_categories_meta_image_idx" ON "product_categories" USING btree ("meta_image_id");
    `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
        -- Drop indexes
        DROP INDEX IF EXISTS "pages_meta_title_idx";
        DROP INDEX IF EXISTS "pages_meta_image_idx";
        DROP INDEX IF EXISTS "_pages_v_version_meta_title_idx";
        DROP INDEX IF EXISTS "_pages_v_version_meta_image_idx";
        DROP INDEX IF EXISTS "products_meta_title_idx";
        DROP INDEX IF EXISTS "products_meta_image_idx";
        DROP INDEX IF EXISTS "_products_v_version_meta_title_idx";
        DROP INDEX IF EXISTS "_products_v_version_meta_image_idx";
        DROP INDEX IF EXISTS "product_categories_meta_title_idx";
        DROP INDEX IF EXISTS "product_categories_meta_image_idx";

        -- Drop foreign key constraints
        ALTER TABLE "pages" DROP CONSTRAINT IF EXISTS "pages_meta_image_id_media_id_fk";
        ALTER TABLE "_pages_v" DROP CONSTRAINT IF EXISTS "_pages_v_version_meta_image_id_media_id_fk";
        ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_meta_image_id_media_id_fk";
        ALTER TABLE "_products_v" DROP CONSTRAINT IF EXISTS "_products_v_version_meta_image_id_media_id_fk";
        ALTER TABLE "product_categories" DROP CONSTRAINT IF EXISTS "product_categories_meta_image_id_media_id_fk";

        -- Drop columns from pages table
        ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_title";
        ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_description";
        ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_image_id";
        ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_keywords";
        ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_preview";

        -- Drop columns from pages version table
        ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_title";
        ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_description";
        ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_image_id";
        ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_keywords";
        ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_preview";

        -- Drop columns from products table
        ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_title";
        ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_description";
        ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_image_id";
        ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_keywords";
        ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_preview";

        -- Drop columns from products version table
        ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_meta_title";
        ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_meta_description";
        ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_meta_image_id";
        ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_meta_keywords";
        ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_meta_preview";

        -- Drop columns from product_categories table
        ALTER TABLE "product_categories" DROP COLUMN IF EXISTS "meta_title";
        ALTER TABLE "product_categories" DROP COLUMN IF EXISTS "meta_description";
        ALTER TABLE "product_categories" DROP COLUMN IF EXISTS "meta_image_id";
        ALTER TABLE "product_categories" DROP COLUMN IF EXISTS "meta_keywords";
        ALTER TABLE "product_categories" DROP COLUMN IF EXISTS "meta_preview";
    `)
}
