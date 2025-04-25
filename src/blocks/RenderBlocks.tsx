import type { Page } from '@/payload-types'

import React, { Fragment } from 'react'

import { HeroBlock } from './Hero/Component'
import { FeaturedProductsBlock } from './FeaturedProducts/Component'

const blockComponents = {
    hero: HeroBlock,
    featuredProducts: FeaturedProductsBlock
}
export const RenderBlocks: React.FC<{
    blocks: Page['layout'][0][]
    // blocks: Page['layout']
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
                            return (
                                <div key={index}>
                                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                    <Block {...block} disableInnerContainer />
                                </div>
                            )
                        }
                    }
                    return null
                })}
            </Fragment>
        )
    }

    return null
}
