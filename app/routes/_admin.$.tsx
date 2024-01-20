import { MetaFunction } from "@remix-run/react";
import AdminTopNav from "~/components/AdminTopNav";
import Select_Bar from "~/components/SelectBar";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Page Author" },
    { name: "Blogs of Mind", content: "Welcome to Blogs Admin Panel!" },
  ];
};
export default function Author() {
  return (
    <div className="text-green-400">
      <AdminTopNav></AdminTopNav>
      <nav>
        <h1 className="text-white">Somethin here</h1>
      </nav>
    </div>
  );
}
