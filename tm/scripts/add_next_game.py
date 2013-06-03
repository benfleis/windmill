#!/usr/bin/env python

import datetime
import json
import pytz
import requests

access_token = '77d3e65e4f'
api_base = 'http://api.playwithlv.com/v1/'
now_iso_8601 = datetime.datetime.now(pytz.timezone('Europe/Amsterdam')).isoformat()

# rusty bikes 2012 windmill team info
team_id = 19083
opponent_id = 19093     # Jabba the Huck
season_id = 20067
auth_hdrs = { 'Authorization': 'bearer ' + access_token, 'Content-Type': 'application/json' }
req_json = json.dumps({ 'start_time': now_iso_8601, 'season_id': season_id, 'team_1_id': team_id, 'team_2_id': opponent_id })

print 'CREATE'
create = requests.post(api_base + 'games/', headers=auth_hdrs, data=req_json)

print create.ok
print create.status_code
if not create.ok:
    print create.headers['location']
else:
    for i in create.headers.iteritems():
        print '{0}: {1}'.format(*i)
#print json.dumps(create.json(), indent=4)


# delete it afterward, this is just test code for now
print
print 'DELETE'
loc = create.headers['location']
delete = requests.delete(loc, headers=auth_hdrs);
print delete.ok
print delete.status_code
for i in delete.headers.iteritems():
    print '{0}: {1}'.format(*i)
if not delete.ok:
    print delete.content
