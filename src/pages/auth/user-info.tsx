import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UserInfo() {
  const {
    register,
    unregister,
    formState: { errors },
    watch,
    setValue,
    reset,
    handleSubmit,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const username = watch("username");
  if (
    // \u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f => accept all chinese/japanese characters
    // À-ÖØ-öø-ÿ accept all french/german characters with accents
    !/^[A-Za-z0-9-_ À-ÖØ-öø-ÿ\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]*$/.test(
      username
    )
  ) {
    console.log("username: ", username);
    setValue("username", username.slice(0, -1));
  }
  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input {...register("firstName", { required: true, maxLength: 20 })} />
    //   <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
    //   <input type="number" {...register("age", { min: 18, max: 99 })} />
    //   <input type="submit" />
    // </form>
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
              {...register("username", {
                required: true,
                maxLength: 30,
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.username && "border-pink-500 text-pink-600"
              }`}
              id="username"
              type="text"
              placeholder="Username"
            />
            {errors.username && watch("username")?.length === 0 && (
              <div className={"text-italic text-red-500"}>
                30 chars max, letters, numbers, spaces
              </div>
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Next
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}
