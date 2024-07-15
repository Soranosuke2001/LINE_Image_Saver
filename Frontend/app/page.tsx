import { HamburgerMenu } from "@/components/HamburgerMenu";
import AppTitle from "@/components/HomeLayout/AppTitle";

export default function Home() {
  return (
    <main className="h-screen">
      <HamburgerMenu />
      <AppTitle />
    </main>
  );
}
