import type { SectionHeaderProps } from "@/app/components/section-header/section-header";
import type { RawSectionHeader } from "@/types/sectionHeader";

export const mapSectionHeader = (
    raw?: null | RawSectionHeader
): SectionHeaderProps => ({
    title: raw?.title ?? "",
    synopsis: raw?.synopsis ?? undefined,
    centered: raw?.centered ?? undefined,
    linkLabel: raw?.link?.label ?? undefined,
    linkUrl: raw?.link?.url ?? undefined,
});
