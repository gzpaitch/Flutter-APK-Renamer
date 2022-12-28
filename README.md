<h1>Watch Builded</h1>

<p>A VS Code extension that watches the "\build\app\outputs\flutter-apk\" folder of the current project and then asks the user to rename the last "app-release.apk" file. The user is then asked if they want to move the renamed file to another folder on their computer.</p>

<h2>Features</h2>

<ul>
  <li>File renaming: Allows the user to rename the "app-release.apk" file in the "\build\app\outputs\flutter-apk\" folder.</li>
  <li>File moving: Allows the user to move the renamed file to a different folder on their computer.</li>
</ul>

<h2>Usage</h2>

<p>To use this extension, do the following:</p>

<ol>
  <li>Open a Flutter project in VS Code.</li>
  <li>Build the project and generate an "app-release.apk" file in the "\build\app\outputs\flutter-apk\" folder.</li>
  <li>The extension will automatically detect the new "app-release.apk" file and prompt the user to enter a new name for the file.</li>
  <li>The extension will then ask the user if they want to move the renamed file to a different folder on their computer.</li>
</ol>

<h2>Requirements</h2>

<ul>
  <li>[Node.js](https://nodejs.org/)</li>
  <li>[TypeScript](https://www.typescriptlang.org/)</li>
</ul>

<h2>Extension Settings</h2>

<p>This extension does not contribute any settings.</p>

<h2>Known Issues</h2>

<ul>
  <li>The extension may not work properly if the "\build\app\outputs\flutter-apk\" folder does not exist or if it contains multiple "app-release.apk" files.</li>
  <li>The extension may not work properly if the file being renamed or moved is</li>
</ul>