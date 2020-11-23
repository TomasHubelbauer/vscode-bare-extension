# VS Code Barebones Extension

This is an example of the most minimal VS Code extension I was able to develop.

It consists of two files in `tomashubelbauer.extension`:
`index.js` and `package.json`.

The `tomashubelbauer.extension` subdirectory exists because VS Code has a CLI
switch for configuring a directory from which to run extensions and it treats
subdirectories of this directory as extensions. This directory groups the files
making up the barebones extension.

`index.js` is the entry point and the implementation of the extension logic. At
current, it displays the extension name and version number using the VS Code API
`window.showInformationMessage`.

`package.json` is the required manifest in its most barebones form possible:

- `name` is required
- `version` is required and must be semver-compatible, `0.0.0`  works
- `publisher` is required but can be empty
- `main` seems to be required, I couldn't get it to default to `index.js` :-(
- `engines/vscode` is required, but at least it will accept `>0.0.0`
- `activationEvents` is required, I used `onStartupFinished` but `*` works, too

I tried using `"type": "module"` in `package.json` and ESM syntax in `index.js`,
but VS Code does not seem to support that.

I made this for fun. I might actually migrate my extensions to this, though, as
I dislike using code generators (`yo code`).

## Running

`code --extensions-dir ${.}`

Replace `${.}` with the path of this repository directory.

## Testing

`node .`


## Publishing

I haven't actually published any extension using this method yet. I know it will
require tweaking to support publishing, the VS Code Marrketplace has checks in
place to make sure extensions contain some metadata VS Code does not enforce.

If I ever do publish an extension using this method, I'll update this to show
how I did it. Most likely the process will require using `vsce package` to pack
the extension directory up to a VSIX archive and then `vsce publish` to submit
the extension to the VS Code Marketplace.
