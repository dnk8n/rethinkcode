import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";
import terser from "lume/plugins/terser.ts";
import relative_urls from "lume/plugins/relative_urls.ts";
import postcss from "lume/plugins/postcss.ts";
import "dotenv/load.ts";

const site = lume({
  src: "lume",
  location: new URL(Deno.env.get("DOMAIN") as string),
});

site.use(relative_urls());
site.use(sass({ extensions: [".scss"] }));
site.use(postcss());
site.use(terser());

site.addEventListener("afterBuild", () => {
  Deno.renameSync("_site/styles.css", "static/styles.css");
});

export default site;

// import lume from "lume/mod.ts";
// import metas from "lume/plugins/metas.ts";
// import minify_html from "lume/plugins/minify_html.ts";
// import prism from "lume/plugins/prism.ts";
// import tailwindcss from "lume/plugins/tailwindcss.ts";
// import postcss from "lume/plugins/postcss.ts";
// import jsx_preact from "lume/plugins/jsx_preact.ts";
// import sitemap from "lume/plugins/sitemap.ts";
// import pagefind from "lume/plugins/pagefind.ts";
// import relations from "lume/plugins/relations.ts";
// import date from "lume/plugins/date.ts";
// import filter_pages from "lume/plugins/filter_pages.ts";
// import attributes from "lume/plugins/attributes.ts";
// import "dotenv/load.ts";

// const site = lume({
//   src: "_src",
//   dest: "static",
//   location: new URL(Deno.env.get("DOMAIN") as string),
//   prettyUrls: false,
// });

// site.copy("_static", ".");

// site.use(metas());
// site.use(minify_html());
// site.use(prism());
// site.use(tailwindcss());
// site.use(postcss());
// site.use(jsx_preact());
// site.use(sitemap());
// site.use(pagefind());
// site.use(relations());
// site.use(date());
// site.use(filter_pages());
// site.use(attributes());

// export default site;
