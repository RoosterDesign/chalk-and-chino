'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const LivePreviewListener = () => {
    const router = useRouter()

    useEffect(() => {
        const listener = (e: MessageEvent) => {
            if (e.data?.type === 'payload-live-preview') {
                console.log('[Live Preview] Payload update received:', e.data)

                // You could use e.data.data.document to update state live
                // For now, just force a refresh
                router.refresh()
            }
        }

        window.addEventListener('message', listener)
        return () => window.removeEventListener('message', listener)
    }, [router])

    return (
        <RefreshRouteOnSave
            refresh={router.refresh}
            serverURL={process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || 'http://localhost:3000'}
        />
    )
}
