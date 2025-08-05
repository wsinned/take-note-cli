export function buildVSCodeHandler() {
  const selectedEditor = "code";
  return (filePath: string) => {
    const subprocess = new Deno.Command(selectedEditor, { args: [filePath] });
    subprocess.spawn();
  };
}
