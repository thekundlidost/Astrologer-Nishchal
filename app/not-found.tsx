import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-heading text-3xl font-bold text-royal-600 dark:text-white sm:text-4xl">
        This Page Has Drifted Off Course
      </h1>
      <p className="mt-3 max-w-md text-sm text-ink/60 dark:text-white/60">
        The page you're looking for doesn't exist or may have moved. Let's get you back on track.
      </p>
      <Link href="/" className="btn-primary mt-7">Back to Home</Link>
    </section>
  );
}
