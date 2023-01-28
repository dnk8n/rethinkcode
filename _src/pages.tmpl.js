import { directusClient } from "directus";

const GetAllArticles = /* GraphQL */ `
  query GetAllArticles {
    articles {
      slug
      status
      translations {
        languages_id {
          code
          name
        }
        title
        body
      }
    }
  }
`;

export const layout = "layouts/article.njk";

export default async function* () {
  const response = await directusClient({
    query: GetAllArticles,
  });
  if (!response.ok) {
    return;
  }
  const { data } = await response.json();

  for (const article of data.articles) {
    const englishTranslation = article.translations.find(translation => translation.languages_id.code === 'en-US');
    if (englishTranslation) {
      if (article.status === "published") {
        yield {
          url: `/articles/${article.slug}/`,
          title: englishTranslation.title,
          body: englishTranslation.body,
        };
      }
    }
  }
}
