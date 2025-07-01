import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('editor', 'admin');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_products_gallery_thumbnail_size" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_gallery_thumbnail_size" AS ENUM('half', 'full');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_stars" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TABLE IF NOT EXISTS "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"intro" varchar,
  	"cta_button_label" varchar,
  	"cta_button_url" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_header_centered" boolean DEFAULT false,
  	"section_header_title" varchar,
  	"section_header_synopsis" varchar,
  	"section_header_link_label" varchar DEFAULT 'View all',
  	"section_header_link_url" varchar DEFAULT '/products',
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_category_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Browse by Category',
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_key_selling_points_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_key_selling_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_header_centered" boolean DEFAULT false,
  	"section_header_title" varchar,
  	"section_header_synopsis" varchar,
  	"section_header_link_label" varchar DEFAULT 'View all',
  	"section_header_link_url" varchar DEFAULT '/products',
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"body" varchar,
  	"cta_button_label" varchar DEFAULT 'Find out more',
  	"cta_button_url" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_gallery_text_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"reverse" boolean DEFAULT false,
  	"at_top" boolean DEFAULT false,
  	"image1_id" integer,
  	"image2_id" integer,
  	"image3_id" integer,
  	"title" varchar,
  	"body" jsonb,
  	"cta_button_label" varchar,
  	"cta_button_url" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_header_centered" boolean DEFAULT false,
  	"section_header_title" varchar,
  	"section_header_synopsis" varchar,
  	"section_header_link_label" varchar DEFAULT 'View all',
  	"section_header_link_url" varchar DEFAULT '/products',
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages_blocks_masthead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );

  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"testimonials_id" integer,
  	"media_id" integer
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"intro" varchar,
  	"cta_button_label" varchar,
  	"cta_button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_featured_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_header_centered" boolean DEFAULT false,
  	"section_header_title" varchar,
  	"section_header_synopsis" varchar,
  	"section_header_link_label" varchar DEFAULT 'View all',
  	"section_header_link_url" varchar DEFAULT '/products',
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_category_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Browse by Category',
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_key_selling_points_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_key_selling_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_header_centered" boolean DEFAULT false,
  	"section_header_title" varchar,
  	"section_header_synopsis" varchar,
  	"section_header_link_label" varchar DEFAULT 'View all',
  	"section_header_link_url" varchar DEFAULT '/products',
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"body" varchar,
  	"cta_button_label" varchar DEFAULT 'Find out more',
  	"cta_button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_gallery_text_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"reverse" boolean DEFAULT false,
  	"at_top" boolean DEFAULT false,
  	"image1_id" integer,
  	"image2_id" integer,
  	"image3_id" integer,
  	"title" varchar,
  	"body" jsonb,
  	"cta_button_label" varchar,
  	"cta_button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_header_centered" boolean DEFAULT false,
  	"section_header_title" varchar,
  	"section_header_synopsis" varchar,
  	"section_header_link_label" varchar DEFAULT 'View all',
  	"section_header_link_url" varchar DEFAULT '/products',
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_masthead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );

  CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"testimonials_id" integer,
  	"media_id" integer
  );

  CREATE TABLE IF NOT EXISTS "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"slug_lock" boolean DEFAULT true,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "products_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );

  CREATE TABLE IF NOT EXISTS "products_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"thumbnail_size" "enum_products_gallery_thumbnail_size" DEFAULT 'half'
  );

  CREATE TABLE IF NOT EXISTS "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"category_id" integer,
  	"price" numeric,
  	"summary" varchar,
  	"description" varchar,
  	"hero_image_id" integer,
  	"custom_payment_delivery" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );

  CREATE TABLE IF NOT EXISTS "_products_v_version_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_products_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"thumbnail_size" "enum__products_v_version_gallery_thumbnail_size" DEFAULT 'half',
  	"_uuid" varchar
  );

  CREATE TABLE IF NOT EXISTS "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_category_id" integer,
  	"version_price" numeric,
  	"version_summary" varchar,
  	"version_description" varchar,
  	"version_hero_image_id" integer,
  	"version_custom_payment_delivery" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );

  CREATE TABLE IF NOT EXISTS "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stars" "enum_testimonials_stars" DEFAULT '5' NOT NULL,
  	"author" varchar,
  	"quote" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );

  CREATE TABLE IF NOT EXISTS "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "footer_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "all_products_category" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "payment_delivery_details" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"custom_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  ALTER TABLE "media" ALTER COLUMN "alt" DROP NOT NULL;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'editor';
  ALTER TABLE "media" ADD COLUMN "sizes_hero_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_masthead_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_masthead_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_masthead_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_masthead_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_masthead_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_masthead_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_product_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_product_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_product_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_product_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_product_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_product_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_category_banner_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_category_banner_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_category_banner_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_category_banner_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_category_banner_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_category_banner_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_banner_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_banner_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_banner_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_banner_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_banner_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_banner_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_text_banner_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_text_banner_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_text_banner_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_text_banner_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_text_banner_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_text_banner_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_full_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_full_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_full_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_full_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_full_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_full_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_carousel_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_carousel_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_carousel_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_carousel_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_carousel_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_gallery_carousel_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_modal_preview_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_modal_preview_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_modal_preview_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_modal_preview_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_modal_preview_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_modal_preview_filename" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_jobs_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_featured_products" ADD CONSTRAINT "pages_blocks_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_category_grid" ADD CONSTRAINT "pages_blocks_category_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_key_selling_points_points" ADD CONSTRAINT "pages_blocks_key_selling_points_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_key_selling_points"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_key_selling_points" ADD CONSTRAINT "pages_blocks_key_selling_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_banner" ADD CONSTRAINT "pages_blocks_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_banner" ADD CONSTRAINT "pages_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gallery_text_banner" ADD CONSTRAINT "pages_blocks_gallery_text_banner_image1_id_media_id_fk" FOREIGN KEY ("image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gallery_text_banner" ADD CONSTRAINT "pages_blocks_gallery_text_banner_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gallery_text_banner" ADD CONSTRAINT "pages_blocks_gallery_text_banner_image3_id_media_id_fk" FOREIGN KEY ("image3_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gallery_text_banner" ADD CONSTRAINT "pages_blocks_gallery_text_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_masthead" ADD CONSTRAINT "pages_blocks_masthead_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_blocks_masthead" ADD CONSTRAINT "pages_blocks_masthead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_featured_products" ADD CONSTRAINT "_pages_v_blocks_featured_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_category_grid" ADD CONSTRAINT "_pages_v_blocks_category_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_key_selling_points_points" ADD CONSTRAINT "_pages_v_blocks_key_selling_points_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_key_selling_points"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_key_selling_points" ADD CONSTRAINT "_pages_v_blocks_key_selling_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_banner" ADD CONSTRAINT "_pages_v_blocks_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_banner" ADD CONSTRAINT "_pages_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gallery_text_banner" ADD CONSTRAINT "_pages_v_blocks_gallery_text_banner_image1_id_media_id_fk" FOREIGN KEY ("image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gallery_text_banner" ADD CONSTRAINT "_pages_v_blocks_gallery_text_banner_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gallery_text_banner" ADD CONSTRAINT "_pages_v_blocks_gallery_text_banner_image3_id_media_id_fk" FOREIGN KEY ("image3_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gallery_text_banner" ADD CONSTRAINT "_pages_v_blocks_gallery_text_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_masthead" ADD CONSTRAINT "_pages_v_blocks_masthead_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_masthead" ADD CONSTRAINT "_pages_v_blocks_masthead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_specifications" ADD CONSTRAINT "products_specifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_products_v_version_specifications" ADD CONSTRAINT "_products_v_version_specifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_category_id_product_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "footer_footer_links" ADD CONSTRAINT "footer_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "all_products_category" ADD CONSTRAINT "all_products_category_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_featured_products_order_idx" ON "pages_blocks_featured_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_featured_products_parent_id_idx" ON "pages_blocks_featured_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_featured_products_path_idx" ON "pages_blocks_featured_products" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_category_grid_order_idx" ON "pages_blocks_category_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_category_grid_parent_id_idx" ON "pages_blocks_category_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_category_grid_path_idx" ON "pages_blocks_category_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_key_selling_points_points_order_idx" ON "pages_blocks_key_selling_points_points" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_key_selling_points_points_parent_id_idx" ON "pages_blocks_key_selling_points_points" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_key_selling_points_order_idx" ON "pages_blocks_key_selling_points" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_key_selling_points_parent_id_idx" ON "pages_blocks_key_selling_points" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_key_selling_points_path_idx" ON "pages_blocks_key_selling_points" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_banner_order_idx" ON "pages_blocks_banner" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_banner_parent_id_idx" ON "pages_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_banner_path_idx" ON "pages_blocks_banner" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_banner_image_idx" ON "pages_blocks_banner" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_text_banner_order_idx" ON "pages_blocks_gallery_text_banner" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_text_banner_parent_id_idx" ON "pages_blocks_gallery_text_banner" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_text_banner_path_idx" ON "pages_blocks_gallery_text_banner" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_text_banner_image1_idx" ON "pages_blocks_gallery_text_banner" USING btree ("image1_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_text_banner_image2_idx" ON "pages_blocks_gallery_text_banner" USING btree ("image2_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_text_banner_image3_idx" ON "pages_blocks_gallery_text_banner" USING btree ("image3_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_masthead_order_idx" ON "pages_blocks_masthead" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_masthead_parent_id_idx" ON "pages_blocks_masthead" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_masthead_path_idx" ON "pages_blocks_masthead" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_masthead_image_idx" ON "pages_blocks_masthead" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_featured_products_order_idx" ON "_pages_v_blocks_featured_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_featured_products_parent_id_idx" ON "_pages_v_blocks_featured_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_featured_products_path_idx" ON "_pages_v_blocks_featured_products" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_category_grid_order_idx" ON "_pages_v_blocks_category_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_category_grid_parent_id_idx" ON "_pages_v_blocks_category_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_category_grid_path_idx" ON "_pages_v_blocks_category_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_key_selling_points_points_order_idx" ON "_pages_v_blocks_key_selling_points_points" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_key_selling_points_points_parent_id_idx" ON "_pages_v_blocks_key_selling_points_points" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_key_selling_points_order_idx" ON "_pages_v_blocks_key_selling_points" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_key_selling_points_parent_id_idx" ON "_pages_v_blocks_key_selling_points" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_key_selling_points_path_idx" ON "_pages_v_blocks_key_selling_points" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_banner_order_idx" ON "_pages_v_blocks_banner" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_banner_parent_id_idx" ON "_pages_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_banner_path_idx" ON "_pages_v_blocks_banner" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_banner_image_idx" ON "_pages_v_blocks_banner" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_text_banner_order_idx" ON "_pages_v_blocks_gallery_text_banner" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_text_banner_parent_id_idx" ON "_pages_v_blocks_gallery_text_banner" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_text_banner_path_idx" ON "_pages_v_blocks_gallery_text_banner" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_text_banner_image1_idx" ON "_pages_v_blocks_gallery_text_banner" USING btree ("image1_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_text_banner_image2_idx" ON "_pages_v_blocks_gallery_text_banner" USING btree ("image2_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_text_banner_image3_idx" ON "_pages_v_blocks_gallery_text_banner" USING btree ("image3_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_masthead_order_idx" ON "_pages_v_blocks_masthead" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_masthead_parent_id_idx" ON "_pages_v_blocks_masthead" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_masthead_path_idx" ON "_pages_v_blocks_masthead" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_masthead_image_idx" ON "_pages_v_blocks_masthead" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_products_id_idx" ON "_pages_v_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "product_categories_slug_idx" ON "product_categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "product_categories_image_idx" ON "product_categories" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "products_specifications_order_idx" ON "products_specifications" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_specifications_parent_id_idx" ON "products_specifications" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_gallery_order_idx" ON "products_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_gallery_parent_id_idx" ON "products_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_gallery_image_idx" ON "products_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "products_hero_image_idx" ON "products" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_products_v_version_specifications_order_idx" ON "_products_v_version_specifications" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_version_specifications_parent_id_idx" ON "_products_v_version_specifications" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_gallery_order_idx" ON "_products_v_version_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_version_gallery_parent_id_idx" ON "_products_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_gallery_image_idx" ON "_products_v_version_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_category_idx" ON "_products_v" USING btree ("version_category_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_hero_image_idx" ON "_products_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_footer_links_order_idx" ON "footer_footer_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_footer_links_parent_id_idx" ON "footer_footer_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "all_products_category_image_idx" ON "all_products_category" USING btree ("image_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_masthead_sizes_masthead_filename_idx" ON "media" USING btree ("sizes_masthead_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_product_thumbnail_sizes_product_thumbnail_filename_idx" ON "media" USING btree ("sizes_product_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_category_banner_sizes_category_banner_filename_idx" ON "media" USING btree ("sizes_category_banner_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_banner_sizes_banner_filename_idx" ON "media" USING btree ("sizes_banner_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_gallery_text_banner_sizes_gallery_text_banner_filename_idx" ON "media" USING btree ("sizes_gallery_text_banner_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_gallery_thumbnail_sizes_gallery_thumbnail_filename_idx" ON "media" USING btree ("sizes_gallery_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_gallery_full_thumbnail_sizes_gallery_full_thumbnail_filename_idx" ON "media" USING btree ("sizes_gallery_full_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_gallery_carousel_thumbnail_sizes_gallery_carousel_thumbnail_filename_idx" ON "media" USING btree ("sizes_gallery_carousel_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_modal_preview_sizes_modal_preview_filename_idx" ON "media" USING btree ("sizes_modal_preview_filename");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");`);
}

export async function down({
    db,
    payload,
    req,
}: MigrateDownArgs): Promise<void> {
    await db.execute(sql`
   ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_featured_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_category_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_key_selling_points_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_key_selling_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery_text_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_masthead" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_featured_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_category_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_key_selling_points_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_key_selling_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery_text_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_masthead" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_specifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_specifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs_log" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "all_products_category" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payment_delivery_details" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_featured_products" CASCADE;
  DROP TABLE "pages_blocks_category_grid" CASCADE;
  DROP TABLE "pages_blocks_key_selling_points_points" CASCADE;
  DROP TABLE "pages_blocks_key_selling_points" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_banner" CASCADE;
  DROP TABLE "pages_blocks_gallery_text_banner" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_masthead" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_featured_products" CASCADE;
  DROP TABLE "_pages_v_blocks_category_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_key_selling_points_points" CASCADE;
  DROP TABLE "_pages_v_blocks_key_selling_points" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_text_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_masthead" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "products_specifications" CASCADE;
  DROP TABLE "products_gallery" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "_products_v_version_specifications" CASCADE;
  DROP TABLE "_products_v_version_gallery" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_footer_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "all_products_category" CASCADE;
  DROP TABLE "payment_delivery_details" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_categories_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk";

  DROP INDEX IF EXISTS "media_sizes_hero_sizes_hero_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_masthead_sizes_masthead_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_product_thumbnail_sizes_product_thumbnail_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_category_banner_sizes_category_banner_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_banner_sizes_banner_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_gallery_text_banner_sizes_gallery_text_banner_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_gallery_thumbnail_sizes_gallery_thumbnail_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_gallery_full_thumbnail_sizes_gallery_full_thumbnail_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_gallery_carousel_thumbnail_sizes_gallery_carousel_thumbnail_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_modal_preview_sizes_modal_preview_filename_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_product_categories_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_products_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_payload_jobs_id_idx";
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "users" DROP COLUMN IF EXISTS "role";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_hero_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_masthead_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_masthead_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_masthead_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_masthead_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_masthead_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_masthead_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_product_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_product_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_product_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_product_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_product_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_product_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_category_banner_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_category_banner_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_category_banner_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_category_banner_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_category_banner_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_category_banner_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_banner_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_banner_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_banner_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_banner_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_banner_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_banner_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_text_banner_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_text_banner_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_text_banner_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_text_banner_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_text_banner_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_text_banner_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_full_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_full_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_full_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_full_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_full_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_full_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_carousel_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_carousel_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_carousel_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_carousel_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_carousel_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_gallery_carousel_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_modal_preview_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_modal_preview_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_modal_preview_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_modal_preview_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_modal_preview_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_modal_preview_filename";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "product_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "payload_jobs_id";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_products_gallery_thumbnail_size";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_gallery_thumbnail_size";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum_testimonials_stars";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`);
}
