-- get now-playing basics

tell application "iTunes"

	set nowPlayingName to name of current track
	set nowPlayingArtist to artist of current track
	set nowPlayingGenre to genre of current track
	set nowPlayingGrouping to grouping of current track

	set nowPlayingInfo to {nowPlayingName, nowPlayingArtist, nowPlayingGenre, nowPlayingGrouping}

end tell
