import { BiError } from "react-icons/bi";

import ErrorButtons from "@/components/ErrorLayout/ErrorButtons";

export default function Page() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-3">
      <span><BiError size={80} color="red" /></span>
      <div className="">
        <h1 className="font-bold text-3xl">Login Failure</h1>
      </div>
      <div className="mt-3">
        <p>There was an error logging you in. Please try again.</p>
      </div>
      <ErrorButtons />
    </div>
  )
}

