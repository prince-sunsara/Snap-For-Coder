"use client"; // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: String };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-center">
        Something went wrong <br />
        {error.message}
      </h2>
      <button
        className=" mt-4 rounded-md bg-sigSurface px-4 py-2 text-sm text-white transition-colors hover:bg-sigButtonHover"
        onClick={
          // attept to recover by trying  to re-render the auth route segment
          () => reset()
        }
      >
        Try Again
      </button>
    </main>
  );
}
