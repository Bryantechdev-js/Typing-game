import Image from "next/image";

export default function Home() {
  return (
<div className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-2 md:gap-5 p-10">
  <Image src={"/ex.jpg" } className="rounded-md" alt="heroImage--1" width={700} height={472}/>
  <div className="heroText">
    <h1 className="text-5xl font-semibold my-6 max-w-[500px]">Track your <strong>expenses with ease</strong> </h1>
    <p className="text-2xl font-medium max-w-[600px]">use expense tracker to track your expenses, get lifeTime access for $99</p>
  </div>
</div>
  );
}
