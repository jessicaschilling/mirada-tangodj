tell application "Embrace"

	-- get now-playing basics
	set PlayerState to player state as string
	if PlayerState = "playing" then

		set nowPlayingName to title of current track
		set nowPlayingArtist to artist of current track
		set nowPlayingGenre to genre of current track
		set nowPlayingGrouping to grouping of current track

		-- Determine if any of the last 10 tracks contained "umparsita", and allow for if you're only in tracks 1-9
		set findCumparsitaIndex to (current index) as integer
		if findCumparsitaIndex > 1 then
			set findCumparsitaIndex to (findCumparsitaIndex + -1)
		end if
		set afterCumparsita to "no"

		repeat 10 times
			if title of track (findCumparsitaIndex) contains "umparsita" then
				set afterCumparsita to "yes"
				exit repeat
			end if
			if findCumparsitaIndex > 1 then
				set findCumparsitaIndex to (findCumparsitaIndex + -1)
			end if
		end repeat

		-- Determine the "x of y" count in the current tanda
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
			if genre of track (songCountX) contains "ortina" then
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

		-- Determine the next tanda, if there is one, and whether it's the last tanda
		set findCortinaIndex to (current index) as integer

		--Get the total number of tracks in the list
		set totalTracks to findCortinaIndex

		repeat
			set totalTracks to (totalTracks + 1)
			try
				get genre of track totalTracks
			on error
				set totalTracks to (totalTracks - 1)
				exit repeat
			end try
		end repeat

		repeat
			if genre of track (findCortinaIndex) contains "ortina" then
				-- Check to see if there's more than one cortina after this one
				repeat
					set findCortinaIndex to (findCortinaIndex + 1)
					if genre of track (findCortinaIndex) does not contain "ortina" then
						exit repeat
					end if
				end repeat
				set nextTandaIndex to (findCortinaIndex)
				set nextTandaArtist to artist of track (nextTandaIndex)
				set nextTandaGenre to genre of track (nextTandaIndex)
				set nextTandaGrouping to grouping of track (nextTandaIndex)
				-- Check if there's a Cumparsita in the next tanda
				repeat
					if findCortinaIndex = (totalTracks + 1) then
						set nextTandaArtist to "Last Tanda"
						set nextTandaGenre to ""
						set nextTandaGrouping to ""
						exit repeat
					end if
					if title of track (findCortinaIndex) contains "umparsita" then
						set nextTandaArtist to "Last Tanda"
						set nextTandaGenre to ""
						set nextTandaGrouping to ""
						exit repeat
					else
						if genre of track (findCortinaIndex) contains "ortina" then
							exit repeat
						end if
					end if
					set findCortinaIndex to (findCortinaIndex + 1)
				end repeat
				-- End of the Cumparsita loop
				exit repeat
			else
				-- Check if you're in the last tanda, i.e. there are no more cortinas left
				if title of track (findCortinaIndex) contains "umparsita" then
					set nextTandaArtist to ""
					set nextTandaGenre to "Last Tanda"
					set nextTandaGrouping to ""
					exit repeat
				end if
			end if
			set findCortinaIndex to (findCortinaIndex + 1)
			if findCortinaIndex = (totalTracks + 1) then
				set nextTandaArtist to ""
				set nextTandaGenre to "Last Tanda"
				set nextTandaGrouping to ""
				exit repeat
			end if
		end repeat

		-- Put it all in a big array
		set nowPlayingInfo to {PlayerState, nowPlayingName, nowPlayingArtist, nowPlayingGenre, nowPlayingGrouping, afterCumparsita, songX, songY, nextTandaArtist, nextTandaGenre, nextTandaGrouping}

	else
		set nowPlayingInfo to {PlayerState, "", "", "", "", "", "", "", "", "", ""}
	end if

end tell
