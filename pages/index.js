import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex gap-10 w-screen h-screen'>
      <Link href="/contact" className="link link-hover text-xl">Contact Form</Link>
      <Link href="/users" className="link link-hover text-xl">User Applications</Link>
    </main>
  )
}
