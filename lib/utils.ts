import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//? Allows you to convert file contents  to be displayed as an image
export const readFileDataUrl = (file: File | Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};

// 2024-06-16T11:20:31.564+00:00 ==> Jun 16
export const formData = (inputDate: Date): string => {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const formattedDate: string = date.toLocaleDateString("en-US", options);
  return formattedDate;
};
