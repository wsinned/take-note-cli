export function buildVSCodeHandler() {
  const selectedEditor = "code";
  return (filePath)=>{
    const subprocess = new Deno.Command(selectedEditor, {
      args: [
        filePath
      ]
    });
    subprocess.spawn();
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS93c2lubmVkL2NvZGUvdGFrZS1ub3RlLWNsaS9oYW5kbGVycy9idWlsZFZTQ29kZUhhbmRsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVlNDb2RlSGFuZGxlcigpIHtcbiAgY29uc3Qgc2VsZWN0ZWRFZGl0b3IgPSBcImNvZGVcIjtcbiAgcmV0dXJuIChmaWxlUGF0aDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc3VicHJvY2VzcyA9IG5ldyBEZW5vLkNvbW1hbmQoc2VsZWN0ZWRFZGl0b3IsIHsgYXJnczogW2ZpbGVQYXRoXSB9KTtcbiAgICBzdWJwcm9jZXNzLnNwYXduKCk7XG4gIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTO0VBQ2QsTUFBTSxpQkFBaUI7RUFDdkIsT0FBTyxDQUFDO0lBQ04sTUFBTSxhQUFhLElBQUksS0FBSyxPQUFPLENBQUMsZ0JBQWdCO01BQUUsTUFBTTtRQUFDO09BQVM7SUFBQztJQUN2RSxXQUFXLEtBQUs7RUFDbEI7QUFDRiJ9
// denoCacheMetadata=18054201509587310356,8255258332705808791