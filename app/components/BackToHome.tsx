import { Link } from "@remix-run/react"

export default function BackToHome() {
  return (
    <Link
      to='/'
      className="absolute flex items-center justify-center text-white font-bold gap-x-2 top-6 left-4 hover:underline hover:text-slate-200"
    >
      <svg viewBox="0 0 54 54" fill='#fff' width={40} height={40}><path d="M27 0C12.112 0 0 12.112 0 27s12.112 27 27 27 27-12.112 27-27S41.888 0 27 0zm0 52C13.215 52 2 40.785 2 27S13.215 2 27 2s25 11.215 25 25-11.215 25-25 25z"/><path d="M32.413 14.293a.999.999 0 0 0-1.414 0L19.501 25.791a1.711 1.711 0 0 0 0 2.418l11.498 11.498a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L21.12 27l11.293-11.293a.999.999 0 0 0 0-1.414z"/></svg>
      Back to home
    </Link>
  );
}