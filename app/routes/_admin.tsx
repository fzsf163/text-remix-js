import { MetaFunction, Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    // { title: "Admin Page" },
    { name: "Blogs of Mind", content: "Welcome to Blogs Admin Panel!" },
  ];
};
export default function Admin() {
  return (
    <div className="text-5xl bg-green-400 h-[100%]">
      <title>Admin Page</title>
      <h1>NO Error</h1>
      <Outlet></Outlet>
    </div>
  );
}
