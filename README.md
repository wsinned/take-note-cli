# take-note-cli

Deno and Typescript implementation of my note taking cli helper

## Usage

### Open your weekly note for this week from the specified folder

Open a file with a name matching the date of the Monday of the week specified:

``` take-note weekly --notesFolder ~/Notes --when thisWeek```

## Development

This build relies on a devcontainer image pre-built from https://github.com/wsinned/oci-shared-images

Clone the repo and run `./ocisictl` to build bluefin-cli-deno-dx image.