import React, { Fragment } from "react";

import type { Page } from "@/payload-types";

import BannerBlock from "./Banner/Component";
import CategoryGridBlockLoader from "./CategoryGrid/Loader";
import ContactBlock from "./Contact/Component";
import FeaturedProductsLoader from "./FeaturedProducts/Loader";
import GalleryBlock from "./Gallery/Component";
import GalleryTextBannerBlock from "./GalleryTextBanner/Component";
import HeroBlock from "./Hero/Component";
import KeySellingPointsBlock from "./KeySellingPoints/Component";
import MapBlock from "./Map/Component";
import MastheadBlock from "./Masthead/Component";
import TestimonialsBlock from "./Testimonials/Component";
import WysiwygBlock from "./Wysiwyg/Component";

const blockComponents: Record<string, React.ComponentType<any>> = {
    hero: HeroBlock,
    featuredProducts: FeaturedProductsLoader,
    categoryGrid: CategoryGridBlockLoader,
    keySellingPoints: KeySellingPointsBlock,
    testimonials: TestimonialsBlock,
    map: MapBlock,
    banner: BannerBlock,
    galleryTextBanner: GalleryTextBannerBlock,
    gallery: GalleryBlock,
    wysiwyg: WysiwygBlock,
    contact: ContactBlock,
    masthead: MastheadBlock,
};
export const RenderBlocks: React.FC<{
    blocks: Page["layout"][0][];
}> = (props) => {
    const { blocks } = props;

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block;

                    if (blockType && blockType in blockComponents) {
                        const Block = blockComponents[blockType];
                        if (Block) {
                            try {
                                return (
                                    <Block
                                        key={index}
                                        {...block}
                                        disableInnerContainer
                                    />
                                );
                            } catch (err) {
                                console.error(
                                    `💥 Error rendering block "${blockType}" at index ${index}`,
                                    err,
                                    block
                                );
                                return null;
                            }
                        }
                    }
                    return null;
                })}
            </Fragment>
        );
    }

    return null;
};
