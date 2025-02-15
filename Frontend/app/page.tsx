import { HamburgerMenu } from "@/components/HamburgerMenu";
import AppTitle from "@/components/HomeLayout/AppTitle";
import BackgroundAnimation from "@/components/HomeLayout/BackgroundAnimation";
import HomeButtons from "@/components/HomeLayout/HomeButtons";

export default function Home() {
  return (
    <main className="h-screen">
      <BackgroundAnimation />
      <HamburgerMenu />
      <AppTitle />
      <HomeButtons />
    </main>
  );
}
