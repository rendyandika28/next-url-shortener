'use client'

import Image from "next/image";
import Link from "next/link";

const Footer = () => (
  <Link href={'/'} className="btn">
    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19c0 .6.4 1 1 1h3v-3c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3h3c.6 0 1-.4 1-1v-8.5" />
    </svg>
    Go to homepage
  </Link>
)

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <section className="text-center flex gap-8 flex-col">
      <Image src={'/error.svg'} width={250} height={250} alt="warning" className="m-auto" />
      <h1 className="text-2xl text-center text-white font-bold mb-4">Upss! we think you're lost, <br /> please turn back!</h1>
      <Footer />
    </section>
  );
}

export default ErrorPage;
