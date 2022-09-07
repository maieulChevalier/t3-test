import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import Router, { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { getSession, useSession } from "next-auth/react";
import { useAtom } from "jotai";
import { authorizationsAtom } from "@/jotai";

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
    await updateUsername.mutateAsync({ username: data.username }).then(() => {
      router.reload();
    });
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
    setValue("username", username.slice(0, -1));
  }
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <form
          className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
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
              className={`focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none ${
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
              className="inline-block pl-2 align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
              href="#"
            >
              Cancel
            </a>

            {username?.length === 0 ? (
              <button
                className="focus:shadow-outline rounded bg-blue-200 py-2 px-4 font-bold text-white focus:outline-none"
                type="submit"
                disabled
              >
                Next
              </button>
            ) : (
              <button
                className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Next
              </button>
            )}
          </div>
        </form>
        <p className="text-center text-xs text-gray-500">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}