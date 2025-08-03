# take-note-cli

Deno and Typescript implementation of my note taking cli helper

## Usage

```
USAGE
  take-note weekly (--when lastWeek|thisWeek|nextWeek) (--notesFolder value) 
    [--editor obsidian|vscode|generic] [--template value]
  take-note --help
  take-note --version

Take Note: A cli note taking helper

FLAGS
  -h --help     Print help information and exit
  -v --version  Print version information and exit

COMMANDS
  weekly  Open a file for the given week's note, creating it first if it doesn't exist
```


### Open your weekly note for this week from the specified folder

Open a file with a name matching the date of the Monday of the week specified using VSCode as the editor:

``` 
take-note weekly --notesFolder ~/Notes --when thisWeek --editor vscode
```

## To Do

Implement the following:
- template file to use for new notes
- batch file creation ahead of time
- workspace option to use with VSCode
- daily notes
- creating and using a config file

## Development

This build relies on a devcontainer image pre-built from https://github.com/wsinned/oci-shared-images

Clone the repo and run `./ocisictl` to build bluefin-cli-deno-dx image.