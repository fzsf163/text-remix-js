import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const lang = {
  name: "lang.",
  options: [
    { label: "bangla", id: "bangla", short: "bang" },
    { label: "english", id: "english", short: "eng" },
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
type Options = {
  name: string;
  options?: [{ label: string; id: string; short: string }];
};
export default function Select_Bar({ name, options }: Options) {
  let opts;

  if (name === "lang.") {
    opts = lang.options;
  } else {
    opts = themes.options;
  }
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px] bg-black border-none font-bold">
          <SelectValue placeholder={name} />
        </SelectTrigger>
        <SelectContent className="bg-black   text-white">
          <SelectGroup>
            <SelectLabel>
              {name === "lang." ? "Language" : "Themes"}
            </SelectLabel>
            {opts?.map(l => {
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
