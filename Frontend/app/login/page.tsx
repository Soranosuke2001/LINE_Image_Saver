import HomeButton from "@/components/LoginLayout/HomeButton";
import LineLoginButton from "@/components/LoginLayout/LineLoginButton";

export default function Page() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
      <div className="w-[90%] flex flex-col justify-center items-center border border-solid border-black p-10 rounded-xl bg-neutral-800 text-white">
        <h1 className="font-bold text-3xl">
          Explore our <span className="text-green-500">LIS</span> App!
        </h1>
        <h2 className="mt-4 mb-10">
          The app that will automatically backup images sent over LINE!
        </h2>

        <p className="text-neutral-400 mb-3">
          Sign in with LINE to get started
        </p>
        <LineLoginButton />
      </div>
      <HomeButton />
    </div>
  );
}
