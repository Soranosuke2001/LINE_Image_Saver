import { outfit_font } from "../fonts";

import Image from "next/image";
import { cn } from "@/lib/utils";

import { HamburgerMenu } from "@/components/HamburgerMenu";
import CreateLineAccButton from "@/components/InstructionsLayout/CreateLineAccButton";
import LoginButton from "@/components/InstructionsLayout/LoginButton";
import MediaPageButton from "@/components/InstructionsLayout/MediaPageButton";

const stepDetails = [
  {
    id: "step1",
    title: "Step 1: Friend the Bot",
    image_url: "/line_bot_qr_code.png",
    image_alt: "Friend QR Code",
    description: "Friend the bot so you can add it to your group chat.",
    button: null,
  },
  {
    id: "step2",
    title: "Step 2: Invite the Bot",
    image_url: null,
    image_alt: null,
    description:
      "If the LINE bot is not added to the chat, the bot will not be able to backup the files.",
    button: null,
  },
  {
    id: "step3",
    title: "Step 3: Login",
    image_url: null,
    image_alt: null,
    description: "Login in to the website via LINE to link LINE accounts.",
    button: <LoginButton />,
  },
  {
    id: "step4",
    title: "Step 4: View backed up files!",
    image_url: null,
    image_alt: null,
    description:
      "You can then view all files that have been automatically backed up!",
    button: <MediaPageButton />,
  },
];

export default function Page() {
  return (
    <main className="h-screen flex flex-col">
      <HamburgerMenu />

      <div className="mt-16 flex-1 overflow-auto p-4">
        <h1 className={cn(outfit_font.className, "text-4xl text-center mb-4")}>
          Getting Started...
        </h1>
        <p className="text-center text-sm mb-2">
          The first app to automatically store all images, videos and other
          files sent via the LINE app!
        </p>

        <div className="flex flex-col gap-6">
          <div className="bg-neutral-200 p-4 rounded-lg">
            <p className="font-light mb-2">
              In order to use this app, you must already have a{" "}
              <span className="text-green-600">LINE</span> account
            </p>
            <CreateLineAccButton />
          </div>

          {stepDetails.map(step => (
            <div key={step.id}>
              <h2 className={cn(outfit_font.className, "text-2xl")}>
                {step.title}
              </h2>
              {step.image_url && (
                <Image
                  src={step.image_url}
                  alt={step.image_alt}
                  width={500}
                  height={500}
                  className="w-[50%]"
                />
              )}
              <p className="font-light">{step.description}</p>
              {step.button}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
