"use client";
import { signOut, signIn, useSession } from "next-auth/react";

export const SignInButton = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      {session ? (
        <button onClick={() => signOut()} className="capitalize">
          sair
        </button>
      ) : (
        <>
          <button
            onClick={() => signIn("google")}
            className="capitalize bg-black text-white p-2 rounded"
          >
            google
          </button>

          <button
            onClick={() => signIn("github")}
            className="capitalize bg-black text-white p-2 rounded"
          >
            github
          </button>
        </>
      )}
    </>
  );
};
