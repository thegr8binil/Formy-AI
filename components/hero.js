import { Button } from "./ui/button";

export default function Hero() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-fit">
      <div className="text-primarytext flex text-[10px] items-center justify-center gap-2 pr-6 sm:ml-10">
        <h1 className="text-3xl font-semibold text-center text-accentv md:text-4xl lg:text-5xl">
        Transform Your Form Creation
        </h1>
      </div>
      <h1 className="text-3xl font-semibold text-center text-accentv md:text-4xl lg:text-5xl">
        With AI Magic in a Snap
        </h1>
      <div className="flex flex-col items-center justify-center pt-2">
        <h1 className="pt-2 font-medium leading-5 text-center text-primarytext text-md sm:text-xl sm:pt-4 md:text-2xl lg:text-3xl">
        Build, Customize, and Share 
        </h1>
        <Button className="mt-4">+ Build AI Form</Button>
      </div>
    </main>
  );
}

