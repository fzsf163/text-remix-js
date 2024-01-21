import {
  Form,
  MetaFunction,
  useActionData,
  useFetcher,
  useRouteError,
} from "@remix-run/react";
import AdminTopNav from "~/components/AdminTopNav";
import { useSearchParams } from "@remix-run/react";
import {
  ActionFunctionArgs,
  json,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { FileUploadHandlerFilterArgs } from "@remix-run/node/dist/upload/fileUploadHandler";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Page Author" },
    { name: "Blogs of Mind", content: "Welcome to Blogs Admin Panel!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      file: ({ filename }: FileUploadHandlerFilterArgs) => {
        const fname = filename.split(" ").join("_");
        return fname;
      },
      directory: `${process.cwd()}/app/img`,
      avoidFileConflicts: true,
    }),
    // parse everything else into memory
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );


  const file = formData.get("file-box") as File;

  // file is a "NodeOnDiskFile" which implements the "File" API
  const path = `/app/img/${file.name}`;
  const u = new URL(`${process.cwd()}/${path}`);

  return json({
    url: u,
    size: file.size,
    name: file.name,
  });
};

export default function Author() {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme");
  const lang = searchParams.get("lang");
  const fetcher = useFetcher();
  const action_data = useActionData<typeof action>();
  const error: any = useRouteError();
  console.log("🚀 ~ Author ~ action_data:", action_data?.url);
  return (
    <div className="text-green-400">
      <AdminTopNav></AdminTopNav>
      <nav>
        <h1 className="text-white text-center">
          Language:{lang} || Theme : {theme}
        </h1>
      </nav>
      <div className="text-white flex flex-col items-center justify-center m-7">
        <img
          src={action_data?.url}
          alt=""
        />
        <h1>File Upload</h1>
        {error && <p>Error happened</p>}
        <Form
          method="post"
          action="/admin"
          encType="multipart/form-data"
        >
          <label>
            Select file:{" "}
            <input
              type="file"
              name="file-box"
            />
          </label>
          <button
            type="submit"
            className="bg-slate-950 text-white p-5"
          >
            Upload
          </button>
        </Form>
      </div>
    </div>
  );
}
