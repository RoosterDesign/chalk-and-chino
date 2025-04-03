import config from '@/payload.config'
import { getPayload } from 'payload'

export const getFooterNav = async () => {
    const payload = await getPayload({ config })
    const nav = await payload.findGlobal({ slug: 'footer' })
    return nav.footerLinks || []
}
