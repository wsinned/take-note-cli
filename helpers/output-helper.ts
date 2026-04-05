/**
 * Output formatting helper for headless mode
 */

export type OutputFormat = "json" | "text" | "silent";

export interface FileResult {
  created: boolean;
  path: string;
  date: string;
}

export function formatOutput(results: FileResult[], format: OutputFormat): string {
  switch (format) {
    case "json":
      return JSON.stringify(results, null, 2);
    
    case "text":
      return results.map(result => {
        const verb = result.created ? "Created" : "Found";
        return `${verb}: ${result.path}`;
      }).join("\n");
    
    case "silent":
      // Silent mode returns empty string (exit code indicates success)
      return "";
  }
}
