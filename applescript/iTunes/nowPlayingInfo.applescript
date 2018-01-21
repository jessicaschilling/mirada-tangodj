tell application "iTunes"

-- get now-playing basics
	set playerState to player state as string
	set nowPlayingName to name of current track
	set nowPlayingArtist to artist of current track
	set nowPlayingGenre to genre of current track
	set nowPlayingGrouping to grouping of current track


-- Determine if any of the last 10 tracks contained "umparsita", and allow for if you're only in tracks 1-9
		set findCumparsitaIndex to (index of current track) as integer
		if findCumparsitaIndex > 1 then
			set findCumparsitaIndex to (findCumparsitaIndex + -1)
		end if
		set afterCumparsita to "no"

		repeat 10 times
			if name of track (findCumparsitaIndex) of current playlist contains "umparsita" then
				set afterCumparsita to "yes"
				exit repeat
			end if
			if findCumparsitaIndex > 1 then
				set findCumparsitaIndex to (findCumparsitaIndex + -1)
			end if
		end repeat

-- Determine the "x of y" count in the current tanda
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

-- Determine the next tanda, if there is one, and whether it's the last tanda
		set findCortinaIndex to (index of current track) as integer
		set totalTracks to (index of last track) of current playlist as integer

		repeat
			if genre of track (findCortinaIndex) of current playlist contains "ortina" then
				-- Check to see if there's more than one cortina after this one
				repeat
					set findCortinaIndex to (findCortinaIndex + 1)
					if genre of track (findCortinaIndex) of current playlist does not contain "ortina" then
						exit repeat
					end if
				end repeat
				set nextTandaIndex to (findCortinaIndex)
				set nextTandaArtist to artist of track (nextTandaIndex) of current playlist
				set nextTandaGenre to genre of track (nextTandaIndex) of current playlist
				set nextTandaGrouping to grouping of track (nextTandaIndex) of current playlist
				-- Check if there's a Cumparsita in the next tanda
				repeat
					set findCortinaIndex to (findCortinaIndex + 1)
					if findCortinaIndex = (totalTracks + 1) then
						set nextTandaArtist to "Last Tanda"
						set nextTandaGenre to ""
						set nextTandaGrouping to ""
						exit repeat
					end if
					if name of track (findCortinaIndex) of current playlist contains "umparsita" then
						set nextTandaArtist to "Last Tanda"
						set nextTandaGenre to ""
						set nextTandaGrouping to ""
						exit repeat
					else
						if genre of track (findCortinaIndex) of current playlist contains "ortina" then
							exit repeat
						end if
					end if
				end repeat
				-- End of the Cumparsita loop
				exit repeat
			else
				-- Check if you're in the last tanda, i.e. there are no more cortinas left
				if name of track (findCortinaIndex) of current playlist contains "umparsita" then
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
	set nowPlayingInfo to {playerState, nowPlayingName, nowPlayingArtist, nowPlayingGenre, nowPlayingGrouping, afterCumparsita, songX, songY, nextTandaArtist, nextTandaGenre, nextTandaGrouping}

end tell
