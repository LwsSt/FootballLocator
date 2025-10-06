declare module '@11ty/eleventy-fetch' {

  import { Agent } from "https";
  import { RequestInit } from "node-fetch";

  // Define the interface for options accepted by eleventyFetch
  export interface FetchOptions extends RequestInit {
    duration?: string; // E.g., "1d", "2h", "30m"
    type?: "json" | "text" | "buffer" | "xml"; // Output type
    directory?: string; // Cache directory
    verbose?: boolean; // Verbose logging
    fetchOptions?: RequestInit; // Options for fetch
    agent?: Agent; // Optional HTTPS agent
    responseType: undefined | "response";
  }

  declare class FetchImpl {

      fetch(): Promise<string>;
  }

  declare function Fetch(link: string, options: FetchOptions):FetchImpl;
}