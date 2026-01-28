import { cache } from "react";
import { getPayload } from "payload";

import configPromise from "@/payload.config";

/**
 * Memoized Payload client so we don't re-create the connection pool
 * on every request/render.
 */
export const getPayloadClient = cache(() => getPayload({ config: configPromise }));
