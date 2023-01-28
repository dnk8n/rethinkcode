export const directusClient = ({
  query,
  variables,
}: {
  query: string | string[];
  // deno-lint-ignore no-explicit-any
  variables: { [key: string]: any };
}) =>
  fetch(`${Deno.env.get("DIRECTUS_API_URL") as string}/graphql`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${Deno.env.get("DIRECTUS_API_KEY") as string}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
