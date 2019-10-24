# mirada-tangodj

**A now-playing and next-tanda visualizer for tango DJs on macOS using Music or Embrace**

## What Mirada does

Mirada launches a standalone application that displays the following info for your dancers for use on an external monitor or projection screen:

- When a **song** is playing, Mirada displays the following:
  - Current song's genre, artist and title (with parenthetical items at the end of title moved to their own line, for those who store year/singer info in the title field).
  - How many songs are in the current tanda, and what number the current song is.
  - The genre and artist of the first song in the next tanda or, if the next tanda is an announcement or the last tanda, the appropriate legend.
  - If the current tanda is the last tanda, the next-tanda area simply displays *"Last Tanda"*.
- When a **cortina** is playing, Mirada displays the legend *"UP NEXT ..."* with the genre and artist of the first song in the next tanda. If the next tanda is an announcement or the last tanda, that legend displays instead.
- When an **announcement** is playing, Mirada displays the title of the track (this is useful for demos, background music, etc -- simply rename the title to a welcome message or similar).
- For mixed **alternative/traditional** milongas, Mirada enables you to replace the artist info in the next-tanda area and the cortina screen with *"Alternative"*.
- If "La Cumparsita" has been played anytime in the last 10 tracks, Mirada displays a **thank-you message** (useful if you play background music after the end of a milonga).
- If no music is playing, a **background image** of your choice appears.
- A variety of **color schemes** are available to customize for light conditions, holiday themes, etc.
- The **source player** can be switched to either Music or Embrace as desired.

## How to make Mirada work for you

Mirada more or less works automagically, but does require a bit of configuration in your source library:

- For cortinas, tanda lengths, and next-tanda info to be correctly detected, your cortinas must have a genre tag of `Cortina`
- For announcements to be correctly detected, announcement tracks' grouping tag must contain `announcement`
- For the alternative-anonymization feature to work correctly, alternative tracks' grouping tag must contain `#nu`


## Tech details and thanks
Mirada is built using [Electron Forge](https://electronforge.io) and relies heavily on a few Node modules to do its thing:

- [run-applescript](https://www.npmjs.com/package/run-applescript) to talk to Music and Embrace
- [electron-store](https://www.npmjs.com/package/electron-store) for variables and preferences

It also subscribes to `com.apple.Music.playerInfo` and/or `com.iccir.Embrace.playerUpdate` to detect change events and kick off the screen refresh.

Huge thanks are in order to [Eric Scace](https://github.com/ericlscace) for invaluable development assistance and to [Ricci Adams](https://github.com/iccir), creator of [Embrace](https://www.ricciadams.com/projects/embrace), for making enhancements to his already-fantastic app in order to allow Mirada to converse with it better.

## Why "Mirada"?
Most tango dancers are familiar with the concept of *cabeceo*, in which the leader "asks" the follower to dance by making eye contact. The concept of *mirada* may be less known, but grants the follower the same power to seek out a leader's gaze -- thereby leveling an often-gendered playing field. This Mirada app also seeks to level the field for dancers by giving everyone at a milonga musical information that makes for a better experience ... and encourages dancers to learn about tango music in the process!

## License

[GNU General Public License v3.0](LICENSE.md)
