import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

/**
 * This function will add an ellipsis "..." to a long text;
 * @argument text
 * @argument max_len - default is 200;
*/
const addEllipsis = (text: string, max_len = 220) => {
  return text.length > max_len ? text.slice(0, max_len - 3) + "..." : text;
};

export {
  cn,
  addEllipsis,
};
