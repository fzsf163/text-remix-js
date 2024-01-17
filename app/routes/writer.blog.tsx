import type { MetaFunction } from "@remix-run/node";
;

export const meta: MetaFunction = () => {
  return [
    { title: "Writer Blogs Page" },
    { name: "Blogs of Mind", content: "Welcome to Blogs!" },
  ];
};

export default function WBlogs() {
  return (
    <div className="text-center text-6xl">
      This is Writer Blogs page
    </div>
  );
}
