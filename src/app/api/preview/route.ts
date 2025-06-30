import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const path = searchParams.get('path')
        const secret = searchParams.get('previewSecret')

        if (secret !== process.env.PREVIEW_SECRET) {
            return new NextResponse('Invalid preview secret', { status: 401 })
        }

        if (!path) {
            return new NextResponse('Missing path', { status: 400 })
        }

        const dm = await draftMode();
        dm.enable();

        return NextResponse.redirect(new URL(path, req.url))
    } catch (err) {
        console.error('[Preview Route Error]', err)
        return new NextResponse('Preview error', { status: 500 })
    }
}
