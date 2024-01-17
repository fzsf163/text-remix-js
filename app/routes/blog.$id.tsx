import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const view = url.searchParams.get("view");

  return json({ id, view });
}
export const meta: MetaFunction = () => {
  return [
    { title: "Single blog Page" },
    { name: "Blogs of Mind", content: "Welcome to Blogs!" },
  ];
};

export default function BlogSingle() {
  const { id, view } = useLoaderData<typeof loader>();

  return (
    <div className="text-center text-6xl">
      This is Blog {id} || {view}
    </div>
  );
}
