// app/api/preview/route.ts
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const dm = await draftMode()
        dm.enable()

        const { searchParams } = new URL(req.url)
        const redirect = searchParams.get('redirect') || '/'
        return NextResponse.redirect(new URL(redirect, req.url))
    } catch (err) {
        console.error('[Preview Route Error]', err)
        return new NextResponse('Preview error', { status: 500 })
    }
}
