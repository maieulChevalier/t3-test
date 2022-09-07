import React from "react";

export default function SignInUserInfoButton({
  username,
  isLoading,
}: {
  username: string;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <button className="font-bold text-blue-200" type="submit" disabled>
        <span className="sr-only">Loading...</span>
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </span>
      </button>
    );
  }
  if (username?.length === 0) {
    return (
      <button
        className="focus:shadow-outline rounded bg-blue-200 py-2 px-4 font-bold text-white focus:outline-none"
        type="submit"
        disabled
      >
        Next
      </button>
    );
  } else {
    return (
      <button
        className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
        type="submit"
      >
        Next
      </button>
    );
  }
}
