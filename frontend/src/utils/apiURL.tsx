const ENV: string = import.meta.env.VITE_ENV as string;
let URL: string;

if (ENV === "LOCAL") {
  URL = "http://localhost:5174";
  console.log("USING ENV: LOCAL");
} else if (ENV === "DEV") {
  URL = import.meta.env.VITE_URL as string;
  console.log("USING ENV: DEV");
} else {
  URL = "http://localhost:5174";
  console.log(
    "WARN: No valid environment available, defaulting to localhost API"
  );
}

export const API_URL_BASE = URL;