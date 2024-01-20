import { MetaFunction } from "@remix-run/react";
import AdminTopNav from "~/components/AdminTopNav";
import { useSearchParams } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Page Author" },
    { name: "Blogs of Mind", content: "Welcome to Blogs Admin Panel!" },
  ];
};
export default function Author() {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme");
  const lang = searchParams.get("lang");
  return (
    <div className="text-green-400">
      <AdminTopNav></AdminTopNav>
      <nav>
        <h1 className="text-white text-center">
          Language:{lang} || Theme : {theme}
        </h1>
      </nav>
    </div>
  );
}
