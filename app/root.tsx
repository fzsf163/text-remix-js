import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import Nav from "~/components/Nav";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-red-500 text-white text-center text-9xl">
        <h1>ERROR</h1>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const is_admin = useLocation();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#C5FFF8] text-black">
        {is_admin.pathname !== "/admin" && <Nav></Nav>}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
