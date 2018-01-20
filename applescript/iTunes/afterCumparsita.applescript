-- Determine if any of the last 10 tracks contained "umparsita", and allow for if you're only in tracks 1-9

tell application "iTunes"

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


	get {afterCumparsita}
end tell
