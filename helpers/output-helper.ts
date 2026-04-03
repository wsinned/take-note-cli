/**
 * Output formatting helper for headless mode
 */

export type OutputFormat = "json" | "text" | "silent";

export interface FileResult {
  created: boolean;
  path: string;
  date: string;
}

export function formatOutput(result: FileResult, format: OutputFormat): string {
  switch (format) {
    case "json":
      return JSON.stringify(result, null, 2);
    
    case "text":
      const verb = result.created ? "Created" : "Found";
      return `${verb}: ${result.path}`;
    
    case "silent":
      // Silent mode returns empty string (exit code indicates success)
      return "";
  }
}
