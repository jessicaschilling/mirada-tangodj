# mirada-standalone

**A now-playing and next-tanda visualizer for tango DJs using iTunes on macOS.**

Mirada launches a standalone application that displays the following info for your dancers (and is best displayed on an external monitor):

- Current song's genre, artist and title (with parenthetical items at the end of title moved to their own line).
- How many songs are in the current tanda, and what number the current song is (this requires your cortinas' genre tag to be "Cortina" in order to work correctly).
- The genre and artist of the first song in the next tanda (again, requires cortina genres to be "Cortina").
- When a cortina is playing, the "next tanda" box expands to fit the entire screen.
- When a track with "announcement" in the grouping field is played, the name of the track is the only item displayed (this is useful for demos, background music, etc).
- If desired, "next tanda" mode can be switched off, and the screen will only display information on the currently playing song.
- Option can be turned on for "anonymizing" alternative tandas in the next-tanda box by replacing artist with "Alternative" (good for mixed alt/trad events, requires alternative tracks to be labeled "#nu" in grouping field)
- When iTunes is paused or stopped, a background image of your choice appears.
- Different color schemes can be applied depending on light conditions, holidays, etc.

This application uses AppleScript to extract information from iTunes, with the exception of a subscription to `com.apple.iTunes.playerInfo` to detect change events. It's built using Electron -- [learn more about Electron here](http://electron.atom.io).

## License

[GNU General Public License v3.0](LICENSE.md)
