export function buildGenericHandler() {
  const selectedEditor = Deno.env.get("EDITOR") ?? "vi";
  return (filePath)=>{
    const subprocess = new Deno.Command(selectedEditor, {
      args: [
        filePath
      ]
    });
    subprocess.spawn();
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS93c2lubmVkL2NvZGUvdGFrZS1ub3RlLWNsaS9oYW5kbGVycy9idWlsZEdlbmVyaWNIYW5kbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBidWlsZEdlbmVyaWNIYW5kbGVyKCkge1xuICBjb25zdCBzZWxlY3RlZEVkaXRvciA9IERlbm8uZW52LmdldChcIkVESVRPUlwiKSA/PyBcInZpXCI7XG4gIHJldHVybiAoZmlsZVBhdGg6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHN1YnByb2Nlc3MgPSBuZXcgRGVuby5Db21tYW5kKHNlbGVjdGVkRWRpdG9yLCB7IGFyZ3M6IFtmaWxlUGF0aF0gfSk7XG4gICAgc3VicHJvY2Vzcy5zcGF3bigpO1xuICB9O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUztFQUNkLE1BQU0saUJBQWlCLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhO0VBQ2pELE9BQU8sQ0FBQztJQUNOLE1BQU0sYUFBYSxJQUFJLEtBQUssT0FBTyxDQUFDLGdCQUFnQjtNQUFFLE1BQU07UUFBQztPQUFTO0lBQUM7SUFDdkUsV0FBVyxLQUFLO0VBQ2xCO0FBQ0YifQ==
// denoCacheMetadata=17333702596051325655,13078499890659679169