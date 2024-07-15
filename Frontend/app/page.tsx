import { HamburgerMenu } from "@/components/HamburgerMenu";
import AppTitle from "@/components/HomeLayout/AppTitle";
import HomeButtons from "@/components/HomeLayout/HomeButtons";

export default function Home() {
  return (
    <main className="h-screen">
      <HamburgerMenu />
      <AppTitle />
      <HomeButtons />
    </main>
  );
}
