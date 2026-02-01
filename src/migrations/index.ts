import * as migration_20250322_121159_initial from "./20250322_121159_initial";
import * as migration_20250509_115910 from "./20250509_115910";
import * as migration_20250115_120000_add_seo_fields from "./20250115_120000_add_seo_fields";
import * as migration_20250115_121000_add_portrait_size from "./20250115_121000_add_portrait_size";

export const migrations = [
  {
    up: migration_20250322_121159_initial.up,
    down: migration_20250322_121159_initial.down,
    name: "20250322_121159_initial",
  },
  {
    up: migration_20250509_115910.up,
    down: migration_20250509_115910.down,
    name: "20250509_115910",
  },
  {
    up: migration_20250115_120000_add_seo_fields.up,
    down: migration_20250115_120000_add_seo_fields.down,
    name: "20250115_120000_add_seo_fields",
  },
  {
    up: migration_20250115_121000_add_portrait_size.up,
    down: migration_20250115_121000_add_portrait_size.down,
    name: "20250115_121000_add_portrait_size",
  },
];
