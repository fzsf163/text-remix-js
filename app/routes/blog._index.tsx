import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet, useNavigate } from "@remix-run/react";
import { ArrowBigRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ClientOnly } from "remix-utils/client-only";
import { PlateEditor } from "~/components/Plate-Editor.client";
import { Suspense, useRef } from "react";
import Editor from "~/components/EditorJS.client";

export const meta: MetaFunction = () => {
  return [
    { title: "Blogs Page" },
    { name: "Blogs of Mind", content: "Welcome to Blogs!" },
  ];
};

export default function Blogs() {
  const navigate = useNavigate();
  
  return (
    <div className="text-center text-6xl">
      <h1> This is Blogs page || write a blog</h1>
      <div className="bg-green-300 m-5 max-w-[600px] grid grid-cols-1 items-center justify-center mx-auto [&_*]:rounded-md gap-5 p-4 rounded-md [&_label]:capitalize [&_label]:text-2xl text-left">
        <Label htmlFor="headline">headline</Label>
        <Input
          name="headline"
          type="text"
        ></Input>
        <Label htmlFor="sub-headline">sub-headline</Label>
        <Input
          name="sub-headline"
          type="text"
        ></Input>
      </div>

      <div>
        {/* only one editor works at a time */}
        <ClientOnly fallback={<p>Loading Editor Please Wait...</p>}>
          {() => (
            <div className="text-left">
              {/* <Editor></Editor> */}
              <br />
              <div className="w-3/5 mx-auto">
                <PlateEditor></PlateEditor>
              </div>
            </div>
          )}
        </ClientOnly>
      </div>
      {/* <Button
        variant={"outline"}
        className="w-fit"
        onClick={() => navigate(`/blog/6?id=6&view=full`)}
      >
        Go to Blog - 6 <ArrowBigRight></ArrowBigRight>
      </Button> */}
    </div>
  );
}
