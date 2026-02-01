import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
        -- Add portrait size columns to media
        ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_url" varchar;
        ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_width" numeric;
        ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_height" numeric;
        ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_mime_type" varchar;
        ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_filesize" numeric;
        ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_portrait_filename" varchar;

        -- Optional index to mirror other size indices
        CREATE INDEX IF NOT EXISTS "media_sizes_portrait_sizes_portrait_filename_idx"
            ON "media" USING btree ("sizes_portrait_filename");
    `);
}

export async function down({
    db,
    payload,
    req,
}: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
        DROP INDEX IF EXISTS "media_sizes_portrait_sizes_portrait_filename_idx";

        ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_portrait_url";
        ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_portrait_width";
        ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_portrait_height";
        ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_portrait_mime_type";
        ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_portrait_filesize";
        ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_portrait_filename";
    `);
}
