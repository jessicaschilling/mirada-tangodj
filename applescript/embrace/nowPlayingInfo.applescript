-- get now-playing basics

tell application "Embrace"
	
	set nowPlayingName to title of current track
	set nowPlayingArtist to artist of current track
	set nowPlayingGenre to genre of current track
	
	set nowPlayingInfo to {nowPlayingName, nowPlayingArtist, nowPlayingGenre}
	
end tell