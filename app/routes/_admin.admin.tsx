import {
  Form,
  MetaFunction,
  isRouteErrorResponse,
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
import { NodeOnDiskFile } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Page Author" },
    { name: "Blogs of Mind", content: "Welcome to Blogs Admin Panel!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  let formData = await unstable_parseMultipartFormData(
    request,
    unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        // Limit file upload to images
        filter({ contentType }) {
          return contentType.includes("image");
        },
        // Store the images in the public/img folder
        directory: "./public/img",
        // By default, `unstable_createFileUploadHandler` adds a number to the file
        // names if there's another with the same name; by disabling it, we replace
        // the old file
        avoidFileConflicts: false,
        // Use the actual filename as the final filename
        file: ({ filename }) => {
          const fname = filename.split(" ").join("_");
          return fname;
        },
        // Limit the max size to 10MB
        maxPartSize: 10 * 1024 * 1024,
      }),
      unstable_createMemoryUploadHandler()
    )
  );

  let files = formData.getAll("file") as NodeOnDiskFile[];
  return json({
    files: files.map(file => ({ name: file.name, url: `/img/${file.name}` })),
  });
};
// const file2 = await request.formData();
// if (!file2) return json({ status: 500 });
// const f = file2.get("file-box") as File;

// if (f?.size > 5_000_000) {
//   return json({ error: "TOO BIG" });
// }
// const uploadHandler = unstable_composeUploadHandlers(
//   unstable_createFileUploadHandler({
//     maxPartSize: 5_000_000,
//     file: ({ filename }) => {
//       const fname = filename.split(" ").join("_");
//       return fname;
//     },
//     // directory: `${process.cwd()}/app/img`,
//     directory: "./public/img",
//     avoidFileConflicts: false,
//   }),
//   // parse everything else into memory
//   unstable_createMemoryUploadHandler()
// );

// const formData = await unstable_parseMultipartFormData(
//   request,
//   uploadHandler
// );

// let files = formData.getAll("file") as NodeOnDiskFile[];
// return json({
//   files: files.map(file => ({ name: file.name, url: `/img/${file.name}` })),
// });
// file is a "NodeOnDiskFile" which implements the "File" API

// const u = new URL(`./public/img/${file.name}`);
// const u = new URL(`./public/img/${file.name}`);

// if (file.size > 5_000_000) {
//   return json({ error_msg: "File size is too big" });
// }

// return json({
//   url: `../public/img/${file.name}`,
//   size: file?.size,
//   name: file?.name,
// });

function useFileUpload() {
  let { submit, data, state, formData } = useFetcher<typeof action>();
  let isUploading = state !== "idle";

  let uploadingFiles = formData
    ?.getAll("file")
    ?.filter((value: unknown): value is File => value instanceof File)
    .map(file => {
      let name = file.name;
      // This line is important; it will create an Object URL, which is a `blob:` URL string
      // We'll need this to render the image in the browser as it's being uploaded
      let url = URL.createObjectURL(file);
      return { name, url };
    });

  let images = (data?.files ?? []).concat(uploadingFiles ?? []);

  return {
    submit(files: FileList | null) {
      if (!files) return;
      let formData = new FormData();
      for (let file of files) formData.append("file", file);
      submit(formData, { method: "POST", encType: "multipart/form-data" });
    },
    isUploading,
    images,
  };
}

export default function Author() {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get("theme");
  const lang = searchParams.get("lang");
  const action_data = useActionData<typeof action>();
  let { submit, isUploading, images } = useFileUpload();
  console.log("🚀 ~ Author ~ images:", images)
  console.log("🚀 ~ Author ~ action_data:", action_data);

  return (
    <div className="text-green-400">
      <AdminTopNav></AdminTopNav>
      <nav>
        <h1 className="text-white text-center">
          Language:{lang} || Theme : {theme}
        </h1>
      </nav>
      <div className="text-white flex flex-col items-center justify-center m-7">
        {/* <img
          // src="http://localhost:3000/img/pexels-pixabay-35888.jpg"
          src={images[0]?.url}
          alt=""
        /> */}
        <h1>File Upload </h1>

        {/* {error && <p>Error happened</p>} */}

        <label className="bg-black p-7 m-5 rounded cursor-pointer">
          {isUploading ? <p>Uploading image...</p> : <p>Select an image</p>}
          <input
            type="file"
            name="file-box"
            hidden
            onChange={event => submit(event.currentTarget.files)}
          />
        </label>
      </div>
      {images.map(file => {
        return (
          <img
            key={file.name}
            src={file.url}
          ></img>
        );
      })}
    </div>
  );
}
