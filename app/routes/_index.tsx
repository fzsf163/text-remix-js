import type { MetaFunction } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import type { ActionFunctionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Prisma } from "@prisma/client";
import { json } from "@remix-run/react";
import { useToast } from "~/components/ui/use-toast";
import {
  Create_User,
  Find_User,
  Get_Comment_Count,
  Get_Users_Count,
  Post_Comment,
} from "~/utilss/prismaFunctions";
import { ToastAction } from "~/components/ui/toast";
import { Toaster } from "~/components/ui/toaster";

export const meta: MetaFunction = () => {
  return [
    { title: "Blogs of Mind" },
    { name: "Blogs of Mind", content: "Welcome to Blogs!" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const userss = await Get_Users_Count();
  const comments_count = await Get_Comment_Count();
  return { userss, comments_count };
}

// 🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨

export async function action({ request }: ActionFunctionArgs) {
  const text = request.formData();
  const commentInput = (await text).get("comment-box") as string;
  const emailInput = (await text).get("email-comment") as string;
  const userNameInput = (await text).get("userName-comment") as string;

  // const validEmail = (email: string) => {
  //   if (!email.includes("@")) {
  //     return "Email Invalid";
  //   }
  // };
  // const validUserName = (userName: string) => {
  //   if (userName.length < 6) {
  //     return "User Name must be Longer";
  //   }
  // };

  const errors = {} as {
    emailExists?: string;
    userNotfound?: string;
    EmptyField?: string;
  };
  const success = { status: "ok" };

  if (commentInput !== "" && emailInput !== "" && userNameInput !== "") {
    try {
      const found_User = await Find_User(emailInput);
      const { foundUser } = found_User;
      if (foundUser?.id) {
        const add_Comment = await Post_Comment(foundUser.id, commentInput);
        const comment = add_Comment.comment;
        console.log("🚀 ~ action | 63 | ~ comment:", comment, add_Comment);
      } else {
        const created_user = await Create_User(emailInput, userNameInput);
        // const created_user_email = created_user.email;
        const created_user_id = created_user.id;
        // const created_user_userName = created_user.userName;

        if (!created_user_id) {
          errors.userNotfound = "User could not be created";
        }
        await Post_Comment(created_user_id, commentInput);
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          errors.emailExists = "Email already exits";
        }
      }
    }
  } else {
    errors.EmptyField = "Empty Fields";
    console.log("🚀 ~ action ~ errors:", errors);
  }

  // if (Object.keys(errors).length) {
  //   return json({ errors });
  // }

  return json({ success, errors });
}

export default function Index() {
  const { comments_count, userss } = useLoaderData<typeof loader>();

  const actionData = useActionData<typeof action>();
  console.log("🚀 ~ Index ~ actionData:", actionData);

  const { toast } = useToast();
  const tosty = () => {
    return toast({
      title: "Scheduled: Catch up ",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
  };
  // if (success?.status === "ok") {
  //   tosty();
  // }
  return (
    <Form
      method="POST"
      preventScrollReset
      navigate={false}
    >
      <div className="grid w-full gap-1.5 max-w-[800px] mx-auto py-5 [&_label]:text-lg [&_label]:font-semibold">
        <label
          htmlFor="comment-box"
          className="text-4xl pb-2 font-semibold"
        >
          Add Your <strong>thoughts</strong> || Current User Count{" "}
          <strong>{userss}</strong> || Total comments{" "}
          <strong>{comments_count}</strong>
        </label>
        <textarea
          name="comment-box"
          id="comment-box"
          placeholder="Type your messeage here please"
          className="min-h-[200px] rounded-lg text-xl p-4 font-sans font-semibold outline-transparent bg-black/40 text-white placeholder:text-green-50/60 animate-in fade-in-35"
          key={`zzxsasdsdadd${Math.random()}`}
        ></textarea>
        <p className="text-sm text-muted-foreground">
          <span className="text-xl pr-1 font-semibold">*</span>Your{" "}
          <strong>message</strong> will be visible to everyone,{" "}
          <span className="text-violet-400 underline underline-offset-2 cursor-pointer">
            Read Guideline
          </span>
        </p>
        <label htmlFor="email-comment">
          Please add your <strong>email</strong>
        </label>
        <input
          className="min-h-[50px] rounded-lg text-xl p-4 font-sans font-semibold outline-transparent bg-black/40 text-white placeholder:text-green-50/60"
          type="email"
          placeholder="e.g. your@email.com"
          name="email-comment"
          id="email-comment"
          autoComplete="on"
          required
          key={`zzxsdd${Math.random()}`}
        />
        {/* {errors?.emailExists && (
          <p className="text-red-500 text-lg">{errors.emailExists}</p>
        )} */}
        <label htmlFor="userName-comment">
          Please pick a <strong>user-name</strong>
        </label>
        <input
          className="min-h-[50px] rounded-lg text-xl p-4 font-sans font-semibold outline-transparent bg-black/40 text-white placeholder:text-green-50/60"
          type="text"
          placeholder="e.g. yourName223"
          name="userName-comment"
          id="userName-comment"
          autoComplete="on"
          required
          key={`aasjasjd${Math.random()}`}
        />
        <p className="text-sm text-muted-foreground">
          <span className="text-xl pr-1 font-semibold">*</span>Your{" "}
          <strong>email</strong> will be not be displayed, User-Name would be
          used instead{" "}
          <span className="text-violet-400 underline underline-offset-2 cursor-pointer">
            Read Guideline
          </span>
        </p>
        <Button
          type="submit"
          variant={"default"}
          className="text-2xl py-7 text-white mt-6"
        >
          Submit
        </Button>
      </div>

      <Toaster></Toaster>
    </Form>
  );
}
