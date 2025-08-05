import { exists } from "@std/fs/exists";
import path from "path";

export async function getTemplateContent(notesFolder: string, templateFlag: string) {
  if (templateFlag === undefined) {
    return "";
  }
  const templatePath = path.join(notesFolder, templateFlag);
  const validFile = await exists(templatePath, { isFile: true });

  if (!validFile) {
    console.log(`Failed to find template ${templatePath}`);
    throw new Error(`Invalid template file: ${templatePath} `);
  }

  console.log(`Using template ${templatePath}`);
  const decoder = new TextDecoder("utf-8");
  const data = Deno.readFileSync(templatePath);
  return decoder.decode(data);
}
