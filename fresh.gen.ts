// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_app.tsx";
import * as $1 from "./routes/_middleware.ts";
import * as $2 from "./routes/api/sendform.ts";
import * as $3 from "./routes/index.tsx";
import * as $$0 from "./islands/contact.tsx";
import * as $$1 from "./islands/language.tsx";

const manifest = {
  routes: {
    "./routes/_app.tsx": $0,
    "./routes/_middleware.ts": $1,
    "./routes/api/sendform.ts": $2,
    "./routes/index.tsx": $3,
  },
  islands: {
    "./islands/contact.tsx": $$0,
    "./islands/language.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
