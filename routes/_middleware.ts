import { MiddlewareHandlerContext } from "$fresh/server.ts";

interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const filePath = "_site" + new URL(req.url).pathname + "/index.html";
  let fileSize;
  try {
    fileSize = (await Deno.stat(filePath)).size;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return await ctx.next();
    }
    return new Response(null, { status: 500 });
  }
  const body = (await Deno.open(filePath)).readable;
  const resp = new Response(body);
  resp.headers.set("content-length", fileSize.toString());
  resp.headers.set("content-type", "text/html; charset=utf-8");
  return resp;
}
