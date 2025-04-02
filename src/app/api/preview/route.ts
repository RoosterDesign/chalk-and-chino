import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const dm = await draftMode() // ✅ await here
    dm.enable() // ✅ then call .enable()

    const { searchParams } = new URL(req.url)
    const redirect = searchParams.get('redirect') || '/'
    return NextResponse.redirect(redirect)
}
