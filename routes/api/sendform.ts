import { Handlers, Status } from "$fresh/server.ts";
import { sendSimpleMail } from "sendgrid";

export const handler: Handlers = {
  async POST(req: Request) {
    const apiKey = Deno.env.get("SENDGRID_API_KEY") || "default";
    const dest = Deno.env.get("SENDFORM_DEST") || "default";
    if ([apiKey, dest].includes("default")) {
      console.error("Required environment variables missing");
      return Response.json({ success: false }, {
        status: Status.InternalServerError,
      });
    }
    const origin = req.headers.get("origin") || req.headers.get("x-forwarded-origin")
    const form: { addr: string; msg: string } = await req.json();
    const from = form.addr || "Anonymous";
    const body = {
      to: [{ email: dest }],
      subject: `${origin} form, from ${from}`,
      from: { email: dest, name: from },
      ...(form.addr ? { bcc: [{ email: from, name: from }] } : {}),
      ...(form.addr ? { replyTo: { email: from, name: from } } : {}),
      content: [{
        type: "text/plain",
        value: `${form.msg}\n\nSupportID:${crypto.randomUUID()}`,
      }],
    };
    const result = await sendSimpleMail(body, { apiKey: apiKey });
    if (!result.success) {
      console.error(result.success, result?.errors);
      console.debug(body);
      return Response.json({ success: false }, {
        status: Status.InternalServerError,
      });
    }
    return Response.json({ success: true }, { status: Status.OK });
  },
};
