Ext.define('TouchMill.model.Game', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'bracket', },                   //": null,
            { name: 'bracket_id', },                //": null,
            { name: 'game_site_id', },              //": 20428,
            { name: 'id', },                        //": 74181,
            { name: 'leaguevine_url', },            //": "http://www.playwithlv.com/games/74181/",
            { name: 'next_game_for_loser', },       //": null,
            { name: 'next_game_for_loser_id', },    //": null,
            { name: 'next_game_for_winner', },      //": null,
            { name: 'next_game_for_winner_id', },   //": null,
            { name: 'next_team_for_loser', },       //": 1,
            { name: 'next_team_for_winner', },      //": 1,
            { name: 'number_of_sets', },            //": null,
            { name: 'pool', },                      //": null,
            { name: 'pool_id', },                   //": null,
            { name: 'pool_round', },                //": null,
            { name: 'pool_round_id', },             //": null,
            { name: 'resource_uri', },              //": "http://api.playwithlv.com/v1/games/74181/",
            { name: 'season_id', },                 //": 20067,
            { name: 'start_time', },                //": "2012-06-17T12:00:00+02:00",
            { name: 'swiss_round_id', },            //": 17039,
            { name: 'team_1_id', },                 //": 19098,
            { name: 'team_1_score', },              //": 13,
            { name: 'team_2_id', },                 //": 19083,
            { name: 'team_2_score', },              //": 15,
            { name: 'time_created', },              //": "2012-06-17T09:09:39.285167+00:00",
            { name: 'time_last_updated', },         //": "2012-06-17T09:09:39.285190+00:00",
            { name: 'timezone', },                  //": "Europe/Amsterdam",
            { name: 'tournament_id', },             //": 18093,
            { name: 'winner_id', },                 //": 19083

            { name: 'is_mine', type: 'boolean', defaultValue: false, },
        ],

        proxy: {
            type: 'configurableRest',
            url: 'games/',
            reader: { type: 'json', rootProperty: 'objects', },
        },

        associations: [
            {
                type: 'hasMany',
                model: 'TouchMill.model.GameScore',
                name: 'gameScores',
                autoLoad: true,
                // kill store to revert to original model.
                store: {
                    //model: 'TouchMill.model.GameScore',
                    proxy: {
                        type: 'configurableRest',
                        url: 'game_scores/',
                        extraParams: { limit: 1, order_by: '[-is_final,-time_last_updated]' },
                        reader: { type: 'json', rootProperty: 'objects', },
                    },
                },
            },
            {
                type: 'hasMany',
                model: 'TouchMill.model.SpiritScore',
                name: 'spiritScores', getterName: 'spiritScores', // XXX only keep one, name for hasMany, getterName for hasOne
                autoLoad: true,
                // kill store to revert to original model.
                store: {
                    model: 'TouchMill.model.SpiritScore',
                    proxy: {
                        type: 'configurableRest',
                        url: 'game_sportsmanship_scores/',
                        extraParams: { limit: 1, order_by: '[-time_last_updated]' },
                        reader: { type: 'json', rootProperty: 'objects', },
                    },
                },
            },
        ],
    },
});
