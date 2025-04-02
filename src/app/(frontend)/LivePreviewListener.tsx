'use client'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation.js'

export const LivePreviewListener: React.FC = () => {
    const router = useRouter()
    return <PayloadLivePreview refresh={router.refresh} serverURL={process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || 'http://localhost:3000'}
    />
}
