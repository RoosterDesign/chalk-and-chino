// app/[...slug]/page.tsx
import type { Metadata } from "next";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload, type RequiredDataFromCollectionSlug } from "payload";

import { LivePreviewListener } from "@/app/LivePreviewListener";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { getPageBySlug } from "@/lib/pages/getPageBySlug";
import configPromise from "@/payload.config";

type PageParams = { slug?: string };
type Props = { params: Promise<PageParams> };

// Force dynamic so draftMode() works
export const dynamic = "force-dynamic";

// Helper for media uploads
type Media = RequiredDataFromCollectionSlug<"media">;

// Hard-coded fallbacks
const SITE_NAME = "Chalk & Chino";
const DEFAULT_DESCRIPTION =
    "Chalk & Chino: bespoke furniture upcycling transforming old pieces into sustainable works of art.";
const FALLBACK_OG_IMAGE =
    "https://www.chalkandchino.co.uk/default-share-image.jpg";

export async function generateMetadata({
    params,
}: {
    params: Promise<PageParams>;
}): Promise<Metadata> {
    const { slug = "homepage" } = await params;
    const page = await getPageBySlug(slug);
    if (!page) return {};

    // Title: meta → name → generic, then append brand
    const baseTitle = page.meta?.title ?? page.name ?? SITE_NAME;
    const title = `${baseTitle} – ${SITE_NAME}`;

    // Description: meta → generic
    const description = page.meta?.description ?? DEFAULT_DESCRIPTION;

    // OG Image: meta.image if populated, else fallback
    const rawImage = page.meta?.image;
    const img =
        rawImage && typeof rawImage !== "number"
            ? (rawImage as Media)
            : undefined;

    const images = img?.url
        ? [
              {
                  url: img.url,
                  width: typeof img.width === "number" ? img.width : undefined,
                  height:
                      typeof img.height === "number" ? img.height : undefined,
              },
          ]
        : [{ url: FALLBACK_OG_IMAGE }];

    return {
        title,
        description,
        openGraph: { title, description, images },
    };
}

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
        collection: "pages",
        draft: true,
        pagination: false,
        select: { slug: true },
    });

    return docs
        .filter((doc) => doc.slug !== "homepage")
        .map(({ slug }) => ({ slug }));
}

export default async function Page({ params }: Props) {
    const { slug = "homepage" } = await params;

    // Next 15: draftMode() returns a Promise<DraftMode>
    const dm = await draftMode();
    const draft = dm.isEnabled;

    const page = await getPageBySlug(slug);
    if (!page) notFound();

    return (
        <>
            {draft && <LivePreviewListener />}
            <RenderBlocks blocks={page.layout} />
        </>
    );
}
