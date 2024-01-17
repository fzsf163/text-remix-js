import { PrismaClient } from "@prisma/client";
import { json, type MetaFunction } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


const prisma = new PrismaClient();

export const meta: MetaFunction = () => {
  return [
    { title: "Forum Page" },
    { name: "Blogs of Mind", content: "Welcome to Blogs!" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const users = await prisma.user.findMany();
  return json({ users });
}

export default function Forum() {
  const u = useLoaderData<typeof loader>();

  return (
    <div className="text-center text-6xl ">
      <h1>This is Forum page</h1>
      <h2>Users List</h2>
      <div className="text-2xl my-10 grid grid-cols-2 gap-12 border border-black">
        {u.users.map(us => {
          return (
            <div
              key={us.id}
              className="border border-blue-500"
            >
              <p>Name: {us.userName}</p>
              <p>Email:{us.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
