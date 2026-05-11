export function buildObsidianHandler() {
  const selectedEditor = getOpenCommand();
  return (filePath)=>{
    const command = `obsidian://open?path=${filePath}`;
    const url = new URL(command);
    const subprocess = new Deno.Command(selectedEditor, {
      args: [
        url.toString()
      ]
    });
    subprocess.spawn();
  };
}
``;
function getOpenCommand() {
  const { os } = Deno.build;
  let app;
  switch(os){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS93c2lubmVkL2NvZGUvdGFrZS1ub3RlLWNsaS9oYW5kbGVycy9idWlsZE9ic2lkaWFuSGFuZGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYnVpbGRPYnNpZGlhbkhhbmRsZXIoKSB7XG4gIGNvbnN0IHNlbGVjdGVkRWRpdG9yID0gZ2V0T3BlbkNvbW1hbmQoKTtcbiAgcmV0dXJuIChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY29tbWFuZCA9IGBvYnNpZGlhbjovL29wZW4/cGF0aD0ke2ZpbGVQYXRofWA7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChjb21tYW5kKTtcbiAgICBjb25zdCBzdWJwcm9jZXNzID0gbmV3IERlbm8uQ29tbWFuZChzZWxlY3RlZEVkaXRvciwgeyBhcmdzOiBbdXJsLnRvU3RyaW5nKCldIH0pO1xuICAgIHN1YnByb2Nlc3Muc3Bhd24oKTtcbiAgfTtcbn1cbmBgXG5mdW5jdGlvbiBnZXRPcGVuQ29tbWFuZCgpIHtcbiAgY29uc3QgeyBvcyB9ID0gRGVuby5idWlsZDtcbiAgbGV0IGFwcDtcblxuICBzd2l0Y2ggKG9zKSB7XG4gICAgY2FzZSBcIndpbmRvd3NcIjpcbiAgICAgIGFwcCA9IFwic3RhcnRcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJkYXJ3aW5cIjpcbiAgICAgIGFwcCA9IFwib3BlblwiO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIGFzc3VtaW5nIHhkZy1vcGVuIGlzIGF2YWlsYWJsZSBvbiBhbGwgKm5peFxuICAgICAgYXBwID0gXCJ4ZGctb3BlblwiO1xuICB9XG4gIHJldHVybiBhcHA7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTO0VBQ2QsTUFBTSxpQkFBaUI7RUFDdkIsT0FBTyxDQUFDO0lBQ04sTUFBTSxVQUFVLENBQUMscUJBQXFCLEVBQUUsVUFBVTtJQUNsRCxNQUFNLE1BQU0sSUFBSSxJQUFJO0lBQ3BCLE1BQU0sYUFBYSxJQUFJLEtBQUssT0FBTyxDQUFDLGdCQUFnQjtNQUFFLE1BQU07UUFBQyxJQUFJLFFBQVE7T0FBRztJQUFDO0lBQzdFLFdBQVcsS0FBSztFQUNsQjtBQUNGO0FBQ0EsRUFBRTtBQUNGLFNBQVM7RUFDUCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsS0FBSyxLQUFLO0VBQ3pCLElBQUk7RUFFSixPQUFRO0lBQ04sS0FBSztNQUNILE1BQU07TUFDTjtJQUNGLEtBQUs7TUFDSCxNQUFNO01BQ047SUFDRjtNQUNFLDZDQUE2QztNQUM3QyxNQUFNO0VBQ1Y7RUFDQSxPQUFPO0FBQ1QifQ==
// denoCacheMetadata=5342937720462845725,11250127202927204457