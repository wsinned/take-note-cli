/**
 * Output formatting helper for headless mode
 */

export type OutputFormat = "json" | "text" | "silent";

export interface FileResult {
  created: boolean;
  path: string;
  date: string;
}

export function formatOutput(result: FileResult | FileResult[], format: OutputFormat): string {
  const results = Array.isArray(result) ? result : [result];
  
  switch (format) {
    case "json":
      return JSON.stringify(results, null, 2);
    
    case "text":
      return results.map(r => {
        const verb = r.created ? "Created" : "Found";
        return `${verb}: ${r.path}`;
      }).join("\n");
    
    case "silent":
      // Silent mode returns empty string (exit code indicates success)
      return "";
  }
}
