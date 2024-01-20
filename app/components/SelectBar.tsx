import { useSearchParams } from "@remix-run/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Options = {
  name: string;
  options?: { label: string; id: string; short: string }[];
  dValue?: string;
};
export default function Select_Bar({ name, options, dValue }: Options) {
  const [searchParams, setSearchParams] = useSearchParams();
  const param_lang = searchParams.get("lang") || "english";
  const param_theme = searchParams.get("theme") || "dark";
  const handleSelectValue = (v: string) => {
    switch (true) {
      case v === "bangla":
        setSearchParams({ lang: v, theme: param_theme }, { replace: true });
        break;
      case v === "english":
        setSearchParams({ lang: v, theme: param_theme }, { replace: true });
        break;
      case v === "leaf":
        setSearchParams({ lang: param_lang, theme: v }, { replace: true });
      case v === "dark":
        setSearchParams({ lang: param_lang, theme: v }, { replace: true });
      case v === "rain":
        setSearchParams({ lang: param_lang, theme: v }, { replace: true });
    }
  };
  return (
    <div>
      <Select
        onValueChange={v => handleSelectValue(v)}
        defaultValue={dValue}
      >
        <SelectTrigger className="w-[180px] bg-black border-none font-bold">
          <SelectValue placeholder={name} />
        </SelectTrigger>
        <SelectContent className="bg-black   text-white">
          <SelectGroup>
            <SelectLabel>
              {name === "lang." ? "Language" : "Themes"}
            </SelectLabel>

            {options?.map(l => {
              return (
                <SelectItem
                  key={l.id}
                  value={l.label}
                  className=" focus:bg-green-500 focus:text-white capitalize focus:text-xl focus:animate-in focus:fade-in-0 focus:duration-150 focus:ease-in-out focus:delay-75 transition-all focus:cursor-pointer"
                >
                  {l.short}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
