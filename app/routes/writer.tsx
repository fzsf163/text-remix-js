import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Author Page" },
    { name: "Blogs of Mind", content: "Welcome to Blogs!" },
  ];
};

export default function Author() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="text-center text-6xl">
      <h1> This is Author page</h1>
      <Link
        to={"blog"}
        key={"blogBtn"}
      >
        <button className="px-4 py-6 m-5 rounded bg-blue-400 text-white text-4xl">
          GO TO Writer's BLOG
        </button>
      </Link>
      <button
        onClick={() => setVisible(x => !x)}
        className={` ${
          visible
            ? "animate-in fade-in-100 px-4 py-6 m-5 rounded bg-blue-400 text-white text-4xl"
            : "animate-out fade-out-100 px-4 py-6 m-5 rounded bg-green-400 text-white text-4xl"
        }`}
      >
        GO TO Writer's BLOG
      </button>

     
      <Outlet></Outlet>
    </div>
  );
}
