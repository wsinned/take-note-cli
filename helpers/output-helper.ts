/**
 * Output formatting helper for headless mode
 */

export type OutputFormat = "json" | "text" | "silent";

export interface FileResult {
  created: boolean;
  path: string;
  date: string;
}

export function formatOutput(results: FileResult | FileResult[], format: OutputFormat): string {
  const items = Array.isArray(results) ? results : [results];
  switch (format) {
    case "json":
      return JSON.stringify(items, null, 2);
    
    case "text":
      return items.map(r => {
        const verb = r.created ? "Created" : "Found";
        return `${verb}: ${r.path}`;
      }).join("\n");
    
    case "silent":
      return "";
  }
}
