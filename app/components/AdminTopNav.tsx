import { useSearchParams } from "@remix-run/react";
import Select_Bar from "./SelectBar";

export default function AdminTopNav() {
  const [searchParams] = useSearchParams();
  const param_lang = searchParams.get("lang") || "english";
  const param_theme = searchParams.get("theme") || "dark";
  const lang = {
    name: "lang.",
    options: [
      { label: "bangla", id: "bangla", short: "bn" },
      { label: "english", id: "english", short: "en" },
    ],
  };
  const themes = {
    name: "themes.",
    options: [
      { label: "dark", id: "dark", short: "dark" },
      { label: "leaf", id: "leaf", short: "leaf" },
      { label: "rain", id: "rain", short: "rain" },
    ],
  };

  return (
    <div className="bg-black h-fit">
      <nav className="text-center p-3 grid grid-flow-row grid-cols-3 items-center justify-items-center ">
        <Select_Bar
          name="lang."
          dValue={param_lang}
          options={lang.options}
        ></Select_Bar>
        <h1 className="bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-600 bg-clip-text text-transparent font-mono font-extrabold text-3xl">
          Admin Panel
        </h1>
        <Select_Bar
          name="themes."
          options={themes.options}
          dValue={param_theme}
        ></Select_Bar>
      </nav>
    </div>
  );
}
