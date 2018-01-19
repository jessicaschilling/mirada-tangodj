-- Determine the next tanda, if there is one, and whether it's the last tanda

tell application "Embrace"
	
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
	
	set nextTandaOutput to {nextTandaArtist, nextTandaGenre, nextTandaGrouping}
end tell
