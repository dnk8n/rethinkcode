export const cmsClient = ({ query, variables }: {
  query: string | string[];
  // deno-lint-ignore no-explicit-any
  variables: { [key: string]: any };
}) =>
  fetch(Deno.env.get("CMS_API_URL") as string, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
