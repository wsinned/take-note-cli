export function buildObsidianHandler() {
  const selectedEditor = getOpenCommand();
  return (filePath: string) => {
    const command = `obsidian://open?path=${filePath}`;
    const url = new URL(command);
    const subprocess = new Deno.Command(selectedEditor, { args: [url.toString()] });
    subprocess.spawn();
  };
}
``
function getOpenCommand() {
  const { os } = Deno.build;
  let app;

  switch (os) {
    case "windows":
      app = "start";
      break;
    case "darwin":
      app = "open";
      break;
    default:
      // assuming xdg-open is available on all *nix
      app = "xdg-open";
  }
  return app;
}
