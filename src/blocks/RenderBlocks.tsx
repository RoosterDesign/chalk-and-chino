import type { Page } from '@/payload-types'

import React, { Fragment } from 'react'

import CategoryGridBlockLoader from './CategoryGrid/Loader'
import FeaturedProductsBlock from './FeaturedProducts/Component'
import HeroBlock from './Hero/Component'
import KeySellingPointsBlock from './KeySellingPoints/Component'
import TestimonialsBlock from './Testimonials/Component'

const blockComponents = {
    hero: HeroBlock,
    featuredProducts: FeaturedProductsBlock,
    categoryGrid: CategoryGridBlockLoader,
    keySellingPoints: KeySellingPointsBlock,
    testimonials: TestimonialsBlock
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
                                return (
                                    <div key={index}>
                                        {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                        <Block {...block} disableInnerContainer />
                                    </div>
                                )
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
