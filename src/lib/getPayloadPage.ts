// src/lib/getPayloadPage.ts
export async function getPayloadPage(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pages/${slug}?draft=true`, {
        headers: {
            Authorization: `Bearer ${process.env.PAYLOAD_API_KEY}`,
        },
        next: { revalidate: 60 }, // ISR or cache-control
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch page: ${slug}`);
    }

    const data = await res.json();
    return data;
}
