'use client'

import { useState } from 'react'

import styles from './styles.module.scss'

type TruncatedText = {
    className?: string
    limit?: number;
    text: string;
}

const TruncatedText: React.FC<TruncatedText> = ({ text, limit = 400, className }) => {
    const [expanded, setExpanded] = useState(false)

    const isTruncated = text.length > limit
    const visibleText = expanded || !isTruncated ? text : text.slice(0, limit);
    return (
        <>

            {visibleText.split('\n').map((line, index, array) => (
                <p key={index}>
                    {line}
                    {isTruncated && !expanded && index === array.length - 1 && '...'}
                </p>
            ))}

            {/* <p>
                {visibleText}
                {isTruncated && !expanded && '...'}
            </p> */}

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
