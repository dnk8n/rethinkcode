import { Handlers, Status } from "$fresh/server.ts";
import sgMail from "npm:@sendgrid/mail@^7.7.0";
import { v4 as uuid4 } from "npm:uuid@^9.0.0";

export const handler: Handlers = {
  async POST(req: Request): Promise<Response> {
    const sendgrid_key: string | undefined = Deno.env.get("SENDGRID_API_KEY");
    const sendform_dest: string | undefined = Deno.env.get("SENDFORM_DEST");
    if (sendgrid_key) sgMail.setApiKey(sendgrid_key);
    const form: { addr: string; msg: string } | undefined = await req.json();
    if (form) {
      const msg = {
        to: sendform_dest,
        from: `${form.addr || "Anonymous"} <${sendform_dest}>`,
        ...(form.addr ? { reply_to: form.addr } : {}),
        subject: `Contact Form [${uuid4()}]`,
        text: form.msg,
      };
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);
        console.debug(msg);
        if (error.response) {
          console.error(error.response.body);
          return new Response(null, {
            status: Status.BadRequest,
            statusText: "Bad Request",
          });
        }
      }
    }
    return new Response(null, { status: Status.OK, statusText: "OK" });
  },
};
