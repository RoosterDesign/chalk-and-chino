import type { Page } from '@/payload-types'

import React, { Fragment } from 'react'

import BannerBlock from './Banner/Component'
import CategoryGridBlockLoader from './CategoryGrid/Loader'
import FeaturedProductsBlock from './FeaturedProducts/Component'
import GalleryBlock from './Gallery/Component'
import GalleryTextBannerBlock from './GalleryTextBanner/Component'
import HeroBlock from './Hero/Component'
import KeySellingPointsBlock from './KeySellingPoints/Component'
import MastheadBlock from './Masthead/Component'
import TestimonialsBlock from './Testimonials/Component'

const blockComponents = {
    hero: HeroBlock,
    featuredProducts: FeaturedProductsBlock,
    categoryGrid: CategoryGridBlockLoader,
    keySellingPoints: KeySellingPointsBlock,
    testimonials: TestimonialsBlock,
    banner: BannerBlock,
    galleryTextBanner: GalleryTextBannerBlock,
    gallery: GalleryBlock,
    masthead: MastheadBlock
}
export const RenderBlocks: React.FC<{
    blocks: Page['layout'][0][]
}> = (props) => {
    const { blocks } = props

    const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

    if (hasBlocks) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block

                    if (blockType && blockType in blockComponents) {
                        const Block = blockComponents[blockType]
                        if (Block) {
                            try {
                                {/* @ts-expect-error there may be some mismatch between the expected types here */ }
                                return <Block key={index} {...block} disableInnerContainer />
                            } catch (err) {
                                console.error(`💥 Error rendering block "${blockType}" at index ${index}`, err, block);
                                return null;
                            }
                        }
                    }
                    return null
                })}
            </Fragment>
        )
    }

    return null
}
