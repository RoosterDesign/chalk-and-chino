import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payloadClient'

const getCachedHeaderNav = unstable_cache(
    async () => {
        const payload = await getPayloadClient();
        const nav = await payload.findGlobal({ slug: 'header' });
        return nav.navItems || [];
    },
    ['header-nav'],
    {
        revalidate: false,
        tags: ['global-header'],
    },
);

export const getHeaderNav = async () => getCachedHeaderNav();
