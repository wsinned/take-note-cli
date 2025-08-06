export function updateTemplateVariables(content: string, date: string): string {
  return content.replace("HEADER_DATE", date);
}
