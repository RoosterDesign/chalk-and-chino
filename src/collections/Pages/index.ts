import type { CollectionConfig } from "payload";

import { slugField } from "@/fields/slug";
import { generatePreviewPath } from "@/lib/utils/generatePreviewPath";

import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import BannerBlock from "../../blocks/Banner/config";
import CategoryGridBlock from "../../blocks/CategoryGrid/config";
import FeaturedProductsBlock from "../../blocks/FeaturedProducts/config";
import GalleryBlock from "../../blocks/Gallery/config";
import GalleryTextBannerBlock from "../../blocks/GalleryTextBanner/config";
// import {
//     MetaDescriptionField,
//     MetaImageField,
//     MetaTitleField,
//     OverviewField,
//     PreviewField,
// } from '@payloadcms/plugin-seo/fields'
import HeroBlock from "../../blocks/Hero/config";
import KeySellingPointsBlock from "../../blocks/KeySellingPoints/config";
import MastheadBlock from "../../blocks/Masthead/config";
import TestimonialsBlock from "../../blocks/Testimonials/config";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";
export const Pages: CollectionConfig = {
    slug: "pages",
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    defaultPopulate: {
        title: true,
        slug: true,
    },
    admin: {
        useAsTitle: "name",
        defaultColumns: ["name", "slug", "_status", "updatedAt"],
        livePreview: {
            url: ({ data }) =>
                generatePreviewPath({ collection: "pages", data }),
        },
        preview: ({ data }) =>
            generatePreviewPath({
                collection: "pages",
                data: data as { id?: string; slug?: string },
            }),
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        ...slugField("name", {
            slugOverrides: {
                admin: {
                    condition: (data, siblingData, { user }) => {
                        const slug = siblingData?.slug ?? data?.slug;
                        const isHomepage = slug === "homepage";
                        const isAdmin = user?.role === "admin";
                        return !isHomepage || isAdmin;
                    },
                },
            },
        }),
        {
            name: "layout",
            type: "blocks",
            required: true,
            blocks: [
                HeroBlock,
                FeaturedProductsBlock,
                CategoryGridBlock,
                KeySellingPointsBlock,
                TestimonialsBlock,
                BannerBlock,
                GalleryTextBannerBlock,
                GalleryBlock,
                MastheadBlock,
            ],
        },
    ],
    hooks: {
        afterChange: [revalidatePage],
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 100,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
};
