import type { Metadata } from "next";

import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import type { RequiredDataFromCollectionSlug } from "payload";

import { LivePreviewListener } from "@/app/LivePreviewListener";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { getPayloadClient } from "@/lib/payloadClient";
import { getPageBySlug } from "@/lib/pages/getPageBySlug";

type PageParams = { slug?: string };
type Props = { params: Promise<PageParams> };

// Serve via ISR rather than always SSR
export const dynamic = "auto";
// Only re-render when Payload hooks call revalidatePath(...) for this route
export const revalidate = false;

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
    // Skip DB calls in maintenance mode
    if (process.env.MAINTENANCE_MODE === "true") {
        return [];
    }

    const payload = await getPayloadClient();
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
