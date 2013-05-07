Ext.define('TouchMill.model.Tournament', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'end_date', },                          //: '2012-06-17',
            { name: 'id', },                                //: 18091,
            { name: 'info', },                              //: '',
            { name: 'leaguevine_url', },                    //: 'http://www.playwithlv.com/tournaments/18091/windmill-windup-2012-open/',
            { name: 'name', },                              //: 'Windmill Windup 2012 open',
            { name: 'number_of_sets', },                    //: null,
            { name: 'resource_uri', },                      //: 'http://api.playwithlv.com/v1/tournaments/18091/',
            { name: 'scheduling_format', },                 //: 'swiss',
/*
            { name: 'season', },                            //: {
                'end_date': '2012-12-31',
                'id': 20068,
                'league': {
                    'id': 6979,
                    'leaguevine_url': 'http://www.playwithlv.com/leagues/6979/club-open/',
                    name: 'Club Open',
                    'resource_uri': 'http://api.playwithlv.com/v1/leagues/6979/'
                },
                'league_id': 6979,
                'leaguevine_url': 'http://www.playwithlv.com/seasons/20068/club-open-2012/',
                name: '2012',
                'resource_uri': 'http://api.playwithlv.com/v1/seasons/20068/',
                'start_date': '2012-01-01',
                'time_created': '2012-04-13T13:10:16+00:00',
                'time_last_updated': '2012-04-13T13:10:22+00:00'
            },
*/
            { name: 'season_id', },                         //: 20068,
            { name: 'start_date', },                        //: '2012-06-15',
            { name: 'swiss_pairing_type', },                //: 'adjacent pairing',
            { name: 'swiss_points_for_bye', },              //: '1.0',
            { name: 'swiss_scoring_system', },              //: 'victory points',
            { name: 'swiss_victory_points_cap', },          //: 25,
            { name: 'swiss_victory_points_games_to', },     //: 15,
            { name: 'time_created', },                      //: '2012-05-24T17:13:02.614883+00:00',
            { name: 'time_last_updated', },                 //: '2012-06-12T08:19:58.615630+00:00',
            { name: 'timezone', },                          //: 'Europe/Amsterdam',
            { name: 'uses_seeds', },                        //: false,
            { name: 'visibility', },                        //: 'live'
        ],
    },
});

