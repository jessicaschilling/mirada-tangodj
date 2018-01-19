-- Determine the "x of y" count in the current tanda

tell application "iTunes"

	set songCountX to (index of current track) as integer
	set songCountY to (index of current track) as integer
	set totalTracks to (index of last track) of current playlist as integer
	set songX to "0" as integer
	set songYSub to "0" as integer

	repeat
		if genre of track (songCountX) of current playlist contains "ortina" then
			exit repeat
		else
			set songCountX to (songCountX + -1)
			set songX to (songX + 1)
		end if
		if songCountX = 0 then
			exit repeat
		end if
	end repeat

	repeat
		if name of track (songCountY) of current playlist contains "umparsita" then
			set songYSub to (songYSub + 1)
			exit repeat
		end if
		if genre of track (songCountY) of current playlist contains "ortina" then
			exit repeat
		else
			set songCountY to (songCountY + 1)
			set songYSub to (songYSub + 1)
		end if
		if songCountY = (totalTracks + 1) then
			exit repeat
		end if
	end repeat

	set songY to (songX + songYSub - 1)
	set songCountOutput to {songX, songY}
end tell
