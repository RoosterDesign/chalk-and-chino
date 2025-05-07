type RichTextNode = {
    children?: RichTextNode[]
    text?: string
    type: string
}

type RichTextRoot = {
    root?: {
        children?: RichTextNode[]
    }
}

export function hasRichTextContent(richText?: null | RichTextRoot): boolean {
    if (!richText?.root?.children) return false

    const walkNodes = (nodes: RichTextNode[]): boolean => {
        for (const node of nodes) {
            if (node.type === 'text' && node.text?.trim()) {
                return true
            }
            if (node.children && walkNodes(node.children)) {
                return true
            }
        }
        return false
    }

    return walkNodes(richText.root.children)
}
