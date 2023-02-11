import { cmsClient } from "../utils/cms.ts";
import { slugify } from "https://deno.land/x/slugify/mod.ts";

const GetAllArticles = /* GraphQL */ `
  query GetAllArticles {
    articles {
      title
      content
    }
  }
`;

export const layout = "layouts/layout.njk";

export default async function* () {
  const response = await cmsClient({ query: GetAllArticles });
  if (!response.ok) return;
  const { data } = await response.json();
  for (const article of data.articles) {
    yield {
      url: `/project/${slugify(article.title)}/`,
      title: article.title,
      content: article.content,
    };
  }
}
