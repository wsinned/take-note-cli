import { exists } from "@std/fs/exists";
import path from "node:path";

export async function getTemplateContent(notesFolder: string, templateFlag?: string) {
  if (templateFlag === undefined) {
    return "";
  }
  const templatePath = path.join(notesFolder, templateFlag);
  const validFile = await exists(templatePath, { isFile: true });

  if (!validFile) {
    console.error(`Failed to find template ${templatePath}`);
    throw new Error(`Invalid template file: ${templatePath} `);
  }

  console.error(`Using template ${templatePath}`);
  const decoder = new TextDecoder("utf-8");
  const data = Deno.readFileSync(templatePath);
  return decoder.decode(data);
}
