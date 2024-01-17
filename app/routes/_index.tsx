import type { MetaFunction } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import type { ActionFunctionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Prisma, PrismaClient } from "@prisma/client";
import { json } from "@remix-run/react";
import { useToast } from "~/components/ui/use-toast";
import { Create_User, Find_User } from "~/utilss/prismaFunctions";

export const meta: MetaFunction = () => {
  return [
    { title: "Blogs of Mind" },
    { name: "Blogs of Mind", content: "Welcome to Blogs!" },
  ];
};
const prisma = new PrismaClient();
export async function loader({ params }: LoaderFunctionArgs) {
  const userss = await prisma.user.count();
  const comments_count = await prisma.comments.count();
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

  const Post_Comment = async (user_ID: string) => {
    return await prisma.comments.create({
      data: {
        comment: commentInput,
        userId: user_ID,
      },
    });
  };

  const errors = {} as { emailExists?: string };

  if (commentInput !== null && emailInput !== null && userNameInput !== null) {
    try {
      const found_User = await Find_User(emailInput);
      console.log("🚀 ~ action ~ found_User:", found_User.foundUser);
      const { foundUser } = found_User;
      if (foundUser?.id) {
        console.log("🚀 ~ action ~ found_User:", foundUser.id);
        const add_Comment = await Post_Comment(foundUser.id);
        const comment = add_Comment.comment;
        console.log("🚀 ~ action | 63 | ~ comment:", comment, add_Comment);
      } else {
        const created_user = await Create_User(emailInput, userNameInput);
        const created_user_email = created_user.email;
        const created_user_id = created_user.id;
        const created_user_userName = created_user.userName;

        if (created_user_id) {
          const add_Comment = await Post_Comment(created_user_id);
          const comment = add_Comment.comment;
          console.log("🚀 ~ action ~ comment:", comment);
        }
        console.log({
          created_user,
          created_user_email,
          created_user_id,
          created_user_userName,
        });
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          errors.emailExists = "Email already exits";
        }
      }
    } finally {
      prisma.$disconnect();
    }
  }

  if (Object.keys(errors).length) {
    return json({ errors });
  }
  return null;
}

export default function Index() {
  const { comments_count, userss } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const emailExist = actionData?.errors.emailExists;
  const { toast } = useToast();
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
          className="min-h-[200px] rounded-lg text-xl p-4 font-sans font-semibold outline-transparent bg-black/40 text-white placeholder:text-green-50/60"
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
        {emailExist && (
          <p className="text-red-500 text-lg">{emailExist.toString()}</p>
        )}
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
    </Form>
  );
}
