const nowPlayingInfoITunes = 'tell application "iTunes" \n\
\n\
-- get now-playing basics \n\
set playerState to player state as string \n\
set nowPlayingName to name of current track \n\
set nowPlayingArtist to artist of current track \n\
set nowPlayingGenre to genre of current track \n\
set nowPlayingGrouping to grouping of current track \n\
\n\
-- Determine if any of the last 10 tracks contained "umparsita", and allow for if you are only in tracks 1-9 \n\
set findCumparsitaIndex to (index of current track) as integer \n\
if findCumparsitaIndex > 1 then \n\
set findCumparsitaIndex to (findCumparsitaIndex + -1) \n\
end if \n\
set afterCumparsita to "no" \n\
\n\
repeat 10 times \n\
if name of track (findCumparsitaIndex) of current playlist contains "umparsita" then \n\
set afterCumparsita to "yes" \n\
exit repeat \n\
end if \n\
if findCumparsitaIndex > 1 then \n\
set findCumparsitaIndex to (findCumparsitaIndex + -1) \n\
end if \n\
end repeat \n\
\n\
-- Determine the "x of y" count in the current tanda \n\
set songCountX to (index of current track) as integer \n\
set songCountY to (index of current track) as integer \n\
set totalTracks to (index of last track) of current playlist as integer \n\
set songX to "0" as integer \n\
set songYSub to "0" as integer \n\
\n\
repeat \n\
if genre of track (songCountX) of current playlist contains "ortina" or grouping of track (songCountX) of current playlist contains "nnounc" then \n\
exit repeat \n\
else \n\
set songCountX to (songCountX + -1) \n\
set songX to (songX + 1) \n\
end if \n\
if songCountX = 0 then \n\
exit repeat \n\
end if \n\
end repeat \n\
\n\
repeat \n\
if name of track (songCountY) of current playlist contains "umparsita" then \n\
set songYSub to (songYSub + 1) \n\
exit repeat \n\
end if \n\
if genre of track (songCountY) of current playlist contains "ortina" then \n\
exit repeat \n\
else \n\
set songCountY to (songCountY + 1) \n\
set songYSub to (songYSub + 1) \n\
end if \n\
if songCountY = (totalTracks + 1) then \n\
exit repeat \n\
end if \n\
end repeat \n\
\n\
set songY to (songX + songYSub - 1) \n\
\n\
-- Determine the next tanda, if there is one, and whether it is the last tanda \n\
set findCortinaIndex to (index of current track) as integer \n\
set totalTracks to (index of last track) of current playlist as integer \n\
\n\
repeat \n\
if genre of track (findCortinaIndex) of current playlist contains "ortina" then \n\
-- Check to see if there is more than one cortina after this one \n\
repeat \n\
set findCortinaIndex to (findCortinaIndex + 1) \n\
if genre of track (findCortinaIndex) of current playlist does not contain "ortina" then \n\
exit repeat \n\
end if \n\
end repeat \n\
set nextTandaIndex to (findCortinaIndex) \n\
set nextTandaArtist to artist of track (nextTandaIndex) of current playlist \n\
set nextTandaGenre to genre of track (nextTandaIndex) of current playlist \n\
set nextTandaGrouping to grouping of track (nextTandaIndex) of current playlist \n\
-- Check if there is a Cumparsita in the next tanda \n\
repeat \n\
set findCortinaIndex to (findCortinaIndex + 1) \n\
if findCortinaIndex = (totalTracks + 1) then \n\
set nextTandaArtist to "Last Tanda" \n\
set nextTandaGenre to "" \n\
set nextTandaGrouping to "" \n\
exit repeat \n\
end if \n\
if name of track (findCortinaIndex) of current playlist contains "umparsita" then \n\
set nextTandaArtist to "Last Tanda" \n\
set nextTandaGenre to "" \n\
set nextTandaGrouping to "" \n\
exit repeat \n\
else \n\
if genre of track (findCortinaIndex) of current playlist contains "ortina" then \n\
exit repeat \n\
end if \n\
end if \n\
end repeat \n\
-- End of the Cumparsita loop \n\
exit repeat \n\
else \n\
-- Check if you are in the last tanda, i.e. there are no more cortinas left \n\
if name of track (findCortinaIndex) of current playlist contains "umparsita" then \n\
set nextTandaArtist to "" \n\
set nextTandaGenre to "Last Tanda" \n\
set nextTandaGrouping to "" \n\
exit repeat \n\
end if \n\
end if \n\
set findCortinaIndex to (findCortinaIndex + 1) \n\
if findCortinaIndex = (totalTracks + 1) then \n\
set nextTandaArtist to "" \n\
set nextTandaGenre to "Last Tanda" \n\
set nextTandaGrouping to "" \n\
exit repeat \n\
end if \n\
end repeat \n\
\n\
-- Put it all in a big array \n\
set nowPlayingInfo to {playerState, "@@", nowPlayingName, "@@", nowPlayingArtist, "@@", nowPlayingGenre, "@@", nowPlayingGrouping, "@@", afterCumparsita, "@@", songX, "@@", songY, "@@", nextTandaArtist, "@@", nextTandaGenre, "@@", nextTandaGrouping} \n\
\n\
end tell \n\
';
module.exports = nowPlayingInfoITunes;
