-- Determine the next tanda, if there is one, and whether it's the last tanda

tell application "iTunes"

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
			-- Check if there's a Cumparsita in the next tanda
			repeat
				set findCortinaIndex to (findCortinaIndex + 1)
				if findCortinaIndex = (totalTracks + 1) then
					set nextTandaArtist to "Last Tanda"
					set nextTandaGenre to ""
					exit repeat
				end if
				if name of track (findCortinaIndex) of current playlist contains "umparsita" then
					set nextTandaArtist to "Last Tanda"
					set nextTandaGenre to ""
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
				exit repeat
			end if
		end if
		set findCortinaIndex to (findCortinaIndex + 1)
		if findCortinaIndex = (totalTracks + 1) then
			set nextTandaArtist to ""
			set nextTandaGenre to "Last Tanda"
			exit repeat
		end if
	end repeat

	set nextTandaOutput to {nextTandaArtist, nextTandaGenre}
end tell
