# Specification

## Summary
**Goal:** Provide reproducible instructions and in-repo setup to build an Android debug APK for the existing web app, and add a standard way to export the full project source as a single ZIP.

**Planned changes:**
- Add an Android WebView-based wrapper project committed in-repo that loads the built web frontend assets.
- Document exact local steps/commands to install dependencies, build the web frontend, copy/sync assets into the Android project, and produce a debug APK.
- Add a script or documented command to export the full project (frontend + backend) as a single ZIP while excluding unnecessary build artifacts.

**User-visible outcome:** A developer can follow the repo docs to generate a working Android debug APK that launches and displays the app, and can also generate/share a single ZIP of the project source code.
