export var Editor = /*#__PURE__*/ function(Editor) {
  Editor[Editor["generic"] = 0] = "generic";
  Editor[Editor["vscode"] = 1] = "vscode";
  Editor[Editor["obsidian"] = 2] = "obsidian";
  return Editor;
}({});
export function isValidEditorOption(option) {
  const editor = Editor[option];
  return editor !== undefined;
}
export function editorFromString(input) {
  if (isValidEditorOption(input)) {
    const editor = Editor[input];
    return editor;
  } else {
    throw new Error("invalid Editor option, must be one of |generic|vscode|obsidian|");
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS93c2lubmVkL2NvZGUvdGFrZS1ub3RlLWNsaS9vcHRpb25zL2VkaXRvck9wdGlvbnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gRWRpdG9yIHtcbiAgICBnZW5lcmljLFxuICAgIHZzY29kZSxcbiAgICBvYnNpZGlhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZEVkaXRvck9wdGlvbihvcHRpb246IHVua25vd24pIHtcbiAgICBjb25zdCBlZGl0b3IgPSBFZGl0b3Jbb3B0aW9uIGFzIGtleW9mIHR5cGVvZiBFZGl0b3JdXG4gICAgcmV0dXJuIGVkaXRvciAhPT0gdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0b3JGcm9tU3RyaW5nKGlucHV0OiB1bmtub3duKTogRWRpdG9yIHtcbiAgICBpZiAoaXNWYWxpZEVkaXRvck9wdGlvbihpbnB1dCkpIHtcbiAgICAgICAgY29uc3QgZWRpdG9yID0gRWRpdG9yW2lucHV0IGFzIGtleW9mIHR5cGVvZiBFZGl0b3JdXG4gICAgICAgIHJldHVybiBlZGl0b3JcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIEVkaXRvciBvcHRpb24sIG11c3QgYmUgb25lIG9mIHxnZW5lcmljfHZzY29kZXxvYnNpZGlhbnxcIilcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBQSxBQUFLLGdDQUFBOzs7O1NBQUE7TUFJWDtBQUVELE9BQU8sU0FBUyxvQkFBb0IsTUFBZTtFQUMvQyxNQUFNLFNBQVMsTUFBTSxDQUFDLE9BQThCO0VBQ3BELE9BQU8sV0FBVztBQUN0QjtBQUVBLE9BQU8sU0FBUyxpQkFBaUIsS0FBYztFQUMzQyxJQUFJLG9CQUFvQixRQUFRO0lBQzVCLE1BQU0sU0FBUyxNQUFNLENBQUMsTUFBNkI7SUFDbkQsT0FBTztFQUNYLE9BQU87SUFDSCxNQUFNLElBQUksTUFBTTtFQUNwQjtBQUNKIn0=
// denoCacheMetadata=3810450874075314717,9920694266110454556