import { useSearchParams } from "@remix-run/react";
import Select_Bar from "./SelectBar";

export default function AdminTopNav() {
  const [searchParams] = useSearchParams();
  console.log("🚀 ~ AdminTopNav ~ searchParams:", searchParams.get("data"));

  return (
    <div className="bg-black h-fit">
      <nav className="text-center p-3 grid grid-flow-row grid-cols-3 items-center justify-items-center ">
        <Select_Bar name="lang."></Select_Bar>
        <h1 className="bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-600 bg-clip-text text-transparent font-mono font-extrabold text-3xl">
          Admin Panel
        </h1>
        <Select_Bar name="themes."></Select_Bar>
      </nav>
    </div>
  );
}
