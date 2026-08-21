'use client'

import { useState } from 'react'

import styles from './styles.module.scss'

type Block =
    | { items: string[]; type: 'list' }
    | { text: string; type: 'paragraph' }

type TruncatedText = {
    className?: string
    limit?: number;
    text: string;
}

// The description is a plain textarea, so a line opening with * is our only
// way of marking up a list item. Anything after the marker is the item text.
const LIST_ITEM = /^\s*\*\s?(.*)$/

const toBlocks = (text: string): Block[] => {
    const blocks: Block[] = []

    text.split('\n').forEach((line) => {
        const listItem = LIST_ITEM.exec(line)

        if (!listItem) {
            blocks.push({ text: line, type: 'paragraph' })
            return
        }

        const previous = blocks.at(-1)

        // Consecutive markers belong to one list; a paragraph between them
        // starts a new one.
        if (previous?.type === 'list') {
            previous.items.push(listItem[1])
            return
        }

        blocks.push({ items: [listItem[1]], type: 'list' })
    })

    return blocks
}

const TruncatedText: React.FC<TruncatedText> = ({ text, limit = 400, className }) => {
    const [expanded, setExpanded] = useState(false)

    const isTruncated = text.length > limit
    // Append the ellipsis before parsing so it lands inside the last block,
    // whether that turns out to be a paragraph or a list item.
    const visibleText = expanded || !isTruncated ? text : `${text.slice(0, limit)}...`
    const blocks = toBlocks(visibleText)

    return (
        <>
            {blocks.map((block, index) =>
                block.type === 'list' ? (
                    <ul className={styles.list} key={index}>
                        {block.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p key={index}>{block.text}</p>
                )
            )}

            {isTruncated && (
                <button
                    className={styles.readMode}
                    onClick={() => setExpanded(!expanded)}
                    type="button"
                >
                    {expanded ? 'Read less' : 'Read more'}
                </button>
            )}
        </>
    )
}

export default TruncatedText
