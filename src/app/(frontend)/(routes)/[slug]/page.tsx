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

// Serve via ISR rather than always SSR
export const dynamic = "auto";
// Re-generate this page at most once every 5 minutes (300 seconds)
export const revalidate = 300;

type Media = RequiredDataFromCollectionSlug<"media">;

const SITE_NAME = "Chalk & Chino";
const DEFAULT_DESCRIPTION =
    "Chalk & Chino: bespoke furniture upcycling transforming old pieces into sustainable works of art.";

export async function generateMetadata({
    params,
}: {
    params: Promise<PageParams>;
}): Promise<Metadata> {
    const { slug = "homepage" } = await params;
    const page = await getPageBySlug(slug);
    if (!page) return {};

    // Build title
    const baseTitle = page.meta?.title ?? page.name ?? SITE_NAME;
    const title = `${baseTitle} – ${SITE_NAME}`;

    // Build description
    const description = page.meta?.description ?? DEFAULT_DESCRIPTION;

    // Build OG image
    return {
        title,
        description,
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
    const { isEnabled: draft } = await draftMode();

    const page = await getPageBySlug(slug);
    if (!page) notFound();

    return (
        <>
            {draft && <LivePreviewListener />}
            <RenderBlocks blocks={page.layout} />
        </>
    );
}
