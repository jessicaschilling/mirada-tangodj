-- Determine whether player is playing

tell application "iTunes"

	set playerState to player state as string

	get {playerState}

end tell
