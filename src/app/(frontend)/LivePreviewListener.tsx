'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

export const LivePreviewListener = () => {
    const router = useRouter()

    // Use the current origin so it matches both local dev and production
    const serverURL = typeof window !== 'undefined' ? window.location.origin : ''

    return (
        <RefreshRouteOnSave
            refresh={router.refresh}
            serverURL={serverURL}
        />
    )
}
