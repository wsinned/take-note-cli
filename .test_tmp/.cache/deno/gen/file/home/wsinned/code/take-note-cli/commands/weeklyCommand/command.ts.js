import { buildCommand } from "@stricli/core";
export const weeklyCommand = buildCommand({
  loader: ()=>import("./impl.ts"),
  parameters: {
    flags: {
      when: {
        brief: "Which week's note to open",
        kind: "enum",
        values: [
          "lastWeek",
          "thisWeek",
          "nextWeek"
        ]
      },
      config: {
        brief: "Named config section to use from ~/.config/take-note/config.toml",
        kind: "parsed",
        parse: String,
        optional: true
      },
      notesFolder: {
        brief: "The root folder containing your notes",
        kind: "parsed",
        parse: String,
        optional: true
      },
      editor: {
        brief: "Which editor configuration to use. Obsidian and VSCode have their own handlers",
        kind: "enum",
        values: [
          "obsidian",
          "vscode",
          "generic"
        ],
        optional: true
      },
      template: {
        brief: "The template file to use when creating new weekly notes",
        kind: "parsed",
        parse: String,
        optional: true
      },
      batch: {
        brief: "The number of files to create, e.g. 3 will create the file for the selected when option and the following 2 weeks",
        kind: "parsed",
        parse: Number,
        default: "1"
      },
      noOpen: {
        brief: "Create the file without opening it in an editor",
        kind: "boolean",
        optional: true
      },
      format: {
        brief: "Output format for --no-open mode",
        kind: "enum",
        values: [
          "json",
          "text",
          "silent"
        ],
        optional: true
      }
    }
  },
  docs: {
    brief: "Open a file for the given week's note, creating it first if it doesn't exist"
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS93c2lubmVkL2NvZGUvdGFrZS1ub3RlLWNsaS9jb21tYW5kcy93ZWVrbHlDb21tYW5kL2NvbW1hbmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYnVpbGRDb21tYW5kIH0gZnJvbSBcIkBzdHJpY2xpL2NvcmVcIjtcblxuZXhwb3J0IGNvbnN0IHdlZWtseUNvbW1hbmQgPSBidWlsZENvbW1hbmQoe1xuICAgIGxvYWRlcjogKCkgPT4gaW1wb3J0KFwiLi9pbXBsLnRzXCIpLFxuICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgZmxhZ3M6IHtcbiAgICAgICAgICAgIHdoZW46IHtcbiAgICAgICAgICAgICAgICBicmllZjogXCJXaGljaCB3ZWVrJ3Mgbm90ZSB0byBvcGVuXCIsXG4gICAgICAgICAgICAgICAga2luZDogXCJlbnVtXCIsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbXCJsYXN0V2Vla1wiLCBcInRoaXNXZWVrXCIsIFwibmV4dFdlZWtcIl0gYXMgY29uc3QsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgYnJpZWY6IFwiTmFtZWQgY29uZmlnIHNlY3Rpb24gdG8gdXNlIGZyb20gfi8uY29uZmlnL3Rha2Utbm90ZS9jb25maWcudG9tbFwiLFxuICAgICAgICAgICAgICAgIGtpbmQ6IFwicGFyc2VkXCIsXG4gICAgICAgICAgICAgICAgcGFyc2U6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub3Rlc0ZvbGRlcjoge1xuICAgICAgICAgICAgICAgIGJyaWVmOiBcIlRoZSByb290IGZvbGRlciBjb250YWluaW5nIHlvdXIgbm90ZXNcIixcbiAgICAgICAgICAgICAgICBraW5kOiBcInBhcnNlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWRpdG9yOiB7XG4gICAgICAgICAgICAgICAgYnJpZWY6IFwiV2hpY2ggZWRpdG9yIGNvbmZpZ3VyYXRpb24gdG8gdXNlLiBPYnNpZGlhbiBhbmQgVlNDb2RlIGhhdmUgdGhlaXIgb3duIGhhbmRsZXJzXCIsXG4gICAgICAgICAgICAgICAga2luZDogXCJlbnVtXCIsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBbXCJvYnNpZGlhblwiLCBcInZzY29kZVwiLCBcImdlbmVyaWNcIl0gYXMgY29uc3QsXG4gICAgICAgICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBicmllZjogXCJUaGUgdGVtcGxhdGUgZmlsZSB0byB1c2Ugd2hlbiBjcmVhdGluZyBuZXcgd2Vla2x5IG5vdGVzXCIsXG4gICAgICAgICAgICAgICAga2luZDogXCJwYXJzZWRcIixcbiAgICAgICAgICAgICAgICBwYXJzZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhdGNoOiB7XG4gICAgICAgICAgICAgICAgYnJpZWY6IFwiVGhlIG51bWJlciBvZiBmaWxlcyB0byBjcmVhdGUsIGUuZy4gMyB3aWxsIGNyZWF0ZSB0aGUgZmlsZSBmb3IgdGhlIHNlbGVjdGVkIHdoZW4gb3B0aW9uIGFuZCB0aGUgZm9sbG93aW5nIDIgd2Vla3NcIixcbiAgICAgICAgICAgICAgICBraW5kOiBcInBhcnNlZFwiLFxuICAgICAgICAgICAgICAgIHBhcnNlOiBOdW1iZXIsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogXCIxXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm9PcGVuOiB7XG4gICAgICAgICAgICAgICAgYnJpZWY6IFwiQ3JlYXRlIHRoZSBmaWxlIHdpdGhvdXQgb3BlbmluZyBpdCBpbiBhbiBlZGl0b3JcIixcbiAgICAgICAgICAgICAgICBraW5kOiBcImJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXQ6IHtcbiAgICAgICAgICAgICAgICBicmllZjogXCJPdXRwdXQgZm9ybWF0IGZvciAtLW5vLW9wZW4gbW9kZVwiLFxuICAgICAgICAgICAgICAgIGtpbmQ6IFwiZW51bVwiLFxuICAgICAgICAgICAgICAgIHZhbHVlczogW1wianNvblwiLCBcInRleHRcIiwgXCJzaWxlbnRcIl0gYXMgY29uc3QsXG4gICAgICAgICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgZG9jczoge1xuICAgICAgICBicmllZjogXCJPcGVuIGEgZmlsZSBmb3IgdGhlIGdpdmVuIHdlZWsncyBub3RlLCBjcmVhdGluZyBpdCBmaXJzdCBpZiBpdCBkb2Vzbid0IGV4aXN0XCIsXG4gICAgfSxcbn0pOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLFlBQVksUUFBUSxnQkFBZ0I7QUFFN0MsT0FBTyxNQUFNLGdCQUFnQixhQUFhO0VBQ3RDLFFBQVEsSUFBTSxNQUFNLENBQUM7RUFDckIsWUFBWTtJQUNSLE9BQU87TUFDSCxNQUFNO1FBQ0YsT0FBTztRQUNQLE1BQU07UUFDTixRQUFRO1VBQUM7VUFBWTtVQUFZO1NBQVc7TUFDaEQ7TUFDQSxRQUFRO1FBQ0osT0FBTztRQUNQLE1BQU07UUFDTixPQUFPO1FBQ1AsVUFBVTtNQUNkO01BQ0EsYUFBYTtRQUNULE9BQU87UUFDUCxNQUFNO1FBQ04sT0FBTztRQUNQLFVBQVU7TUFDZDtNQUNBLFFBQVE7UUFDSixPQUFPO1FBQ1AsTUFBTTtRQUNOLFFBQVE7VUFBQztVQUFZO1VBQVU7U0FBVTtRQUN6QyxVQUFVO01BQ2Q7TUFDQSxVQUFVO1FBQ04sT0FBTztRQUNQLE1BQU07UUFDTixPQUFPO1FBQ1AsVUFBVTtNQUNkO01BQ0EsT0FBTztRQUNILE9BQU87UUFDUCxNQUFNO1FBQ04sT0FBTztRQUNQLFNBQVM7TUFDYjtNQUNBLFFBQVE7UUFDSixPQUFPO1FBQ1AsTUFBTTtRQUNOLFVBQVU7TUFDZDtNQUNBLFFBQVE7UUFDSixPQUFPO1FBQ1AsTUFBTTtRQUNOLFFBQVE7VUFBQztVQUFRO1VBQVE7U0FBUztRQUNsQyxVQUFVO01BQ2Q7SUFDSjtFQUNKO0VBQ0EsTUFBTTtJQUNGLE9BQU87RUFDWDtBQUNKLEdBQUcifQ==
// denoCacheMetadata=13119418599965550853,11668342046240225591