-- Determine the "x of y" count in the current tanda

tell application "Embrace"

	set songCountX to (current index) as integer
	set songCountY to (current index) as integer

	--Get the total number of tracks in the list
	set totalTracks to (current index) as integer
	repeat
		set totalTracks to (totalTracks + 1)
		try
			get genre of track totalTracks
		on error
			set totalTracks to (totalTracks - 1)
			exit repeat
		end try
	end repeat

	set songX to "0" as integer
	set songYSub to "0" as integer

	repeat
		if genre of track (songCountX) = "Cortina" then
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
		if title of track (songCountY) contains "umparsita" then
			set songYSub to (songYSub + 1)
			exit repeat
		end if
		if genre of track (songCountY) contains "ortina" then
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

	if genre of track(current index) contains "ortina" then
		set songCountOutput to {"", ""}
	else
		set songCountOutput to {songX, songY}
	end if

end tell
