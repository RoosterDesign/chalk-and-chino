import config from '@/payload.config'
import { getPayload } from 'payload'

export const getHeaderNav = async () => {
    const payload = await getPayload({ config })
    const nav = await payload.findGlobal({ slug: 'header' })
    return nav.navItems || []
}
