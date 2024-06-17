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

// The error.tsx file can be used to define a UI boundary for a route segment.
// It serves as a catch-all for unexpected errors and allows you to display a fallback UI to your users.

// There are a few things you'll notice about the code above:

// "use client" - error.tsx needs to be a Client Component.
// It accepts two props:
// error: This object is an instance of JavaScript's native Error object.
// reset: This is a function to reset the error boundary. When executed, the function will try to re-render the route segment.
