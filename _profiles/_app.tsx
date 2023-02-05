import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Dean Kayton - Professional Tinkerer</title>
        <meta
          name="description"
          content="Professional Tinkerer and Digital Nomad"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <a class="hidden" rel="me" href="https://fosstodon.org/@mooxl"></a>
      <div class="max-w-xl my-5 mx-auto lg:mx-2 sm:mx-1 text-sm text-white font-plex leading-none tracking-wide md:my-3">
        <Component />
      </div>
    </>
  );
}
