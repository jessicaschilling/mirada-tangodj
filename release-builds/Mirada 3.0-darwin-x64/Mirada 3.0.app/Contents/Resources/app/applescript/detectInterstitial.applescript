-- Determine the "x of y" count in the current tanda

tell application "iTunes"

	set nowPlayingGenre to genre of current track
  set nowPlayingGrouping to grouping of current track

	set songCountOutput to {nowPlayingGenre, nowPlayingGrouping}
end tell
