import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import Spinner from "./LoaderPacman";

export function refreshSession() {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
}

export default function AuthSignInUserInfo() {
  const { mutateAsync: asyncUpdateUsername, isLoading } = trpc.useMutation([
    "auth.updateUsername",
  ]);

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
    await asyncUpdateUsername({ username: data.username }).then(() => {
      refreshSession();
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

  if (isLoading) return <Spinner />;
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
                errors.username &&
                watch("username")?.length === 0 &&
                "border-pink-500 text-pink-600"
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
                className="focus:shadow-outline rounded bg-slate-200 py-2 px-4 font-bold text-white focus:outline-none"
                type="submit"
                disabled
              >
                {/* {isLoading ? (
                  <svg
                    className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent"
                    role="status"
                    aria-label="loading"
                    viewBox="0 0 24 24"
                  ></svg>
                ) : (
                  ""
                )} */}
                Next
              </button>
            ) : (
              <button
                className="focus:shadow-outline rounded bg-slate-500 py-2 px-4 font-bold text-white hover:bg-slate-600 focus:outline-none"
                type="submit"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
