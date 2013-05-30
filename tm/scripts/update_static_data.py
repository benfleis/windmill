#!/bin/sh

set -xv

# get all tournament teams from our 3 tourneys
fields="tournament_id,team_id"
curl "http://api.playwithlv.com/v1/tournament_teams/?limit=200&offset=0&access_token=831de84163&tournament_ids=%5B18091%2C18093%2C18094%5D&fields=%5B$fields%5D" > tournament_teams.json

rm teams.json
fields="tournament_id,team_id"
for season_id in 20067 20068 20069; do
    curl "http://api.playwithlv.com/v1/teams/?limit=200&offset=0&&access_token=831de84163&season_id=$season_id&order_by=%5Bname,country%5D" >> teams.json
done
