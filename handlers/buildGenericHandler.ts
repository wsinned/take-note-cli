export function buildGenericHandler() {
  const selectedEditor = Deno.env.get("EDITOR") ?? "vi";
  return (filePath: string) => {
    const subprocess = new Deno.Command(selectedEditor, { args: [filePath] });
    subprocess.spawn();
  };
}
