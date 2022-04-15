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

To not have testing and developing mess with up your VS Code instance, open up a
terminal window in the repository directory and alternate these two commands as
needed:

- `node .` to test/run the code
- `code .` to open the repository directory in VS Code

## Publishing

I haven't actually published any extension using this method yet. I know it will
require tweaking to support publishing, the VS Code Marrketplace has checks in
place to make sure extensions contain some metadata VS Code does not enforce.

If I ever do publish an extension using this method, I'll update this to show
how I did it. Most likely the process will require using `vsce package` to pack
the extension directory up to a VSIX archive and then `vsce publish` to submit
the extension to the VS Code Marketplace.

## To-Do

### Figure out why the `index.log` file is empty in CI - extension not working

This also reproduces locally so it might be easier to debug this way. To repro,
run `ubuntu`, then `cd` to `/mnt/…/vscode-barebones-extension` and run `node .`
(make sure you have a recent version of Node and Code installed). This will show
the temporary directory path as expected, but running `/mnt/…/index.log` will
print an empty file. `node .` does not seem to run the extension and update the
file.

### Transfer over the currently working logic from code-extension-screencast

https://github.com/TomasHubelbauer/code-extension-screencast

Need to figure out how to simplify the extension runner to work with this.
