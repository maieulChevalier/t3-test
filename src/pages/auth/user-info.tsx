import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Router, { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { getSession } from "next-auth/react";

export default function UserInfo() {
  const updateUsername = trpc.useMutation(["auth.updateUsername"]);

  const router = useRouter();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: "",
    },
  });
  const onSubmit = async (data: any) => {
    await updateUsername.mutateAsync({ username: data.username });
    // router.reload()
    Router.push("/");
  };

  const username = watch("username");
  if (
    !/^[A-Za-z0-9-_ À-ÖØ-öø-ÿ\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]*$/.test(
      username
    ) ||
    /\s{2,}/g.test(username) ||
    /-{2,}/g.test(username) ||
    /_{2,}/g.test(username)
    // A-Za-z0-9-_ À-ÖØ-öø-ÿ\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f
    // A-Za-z0-9-_  => alpha-numeric characters with - _ and spaces
    // À-ÖØ-öø-ÿ accept all french/german characters with accents
    // \u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f => accept all chinese/japanese characters
    // /\s{2,}/g.test(username) => block double space
    // edge cases like spaces before or after should be handled server side
  ) {
    setValue("username", username.slice(0, -1));
  }
  if (username.length > 30) {
    console.log("username: ", username);
    setValue("username", username.slice(0, -1));
  }
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              defaultValue=""
              {...register("username", {
                required: true,
                maxLength: 30,
                minLength: 2,
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.username && "border-pink-500 text-pink-600"
              }`}
              id="username"
              type="text"
              placeholder="Username"
            />
            {errors.username && watch("username")?.length === 0 && (
              <div className={"text-italic text-red-500"}>required</div>
            )}
          </div>
          <div className="mb-6"></div>
          <div className="flex items-center justify-between">
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 pl-2"
              href="#"
            >
              Cancel
            </a>

            {username?.length === 0 ? (
              <button
                className="bg-blue-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled
              >
                Next
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Next
              </button>
            )}
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}
