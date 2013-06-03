Ext.define('TouchMill.model.Game', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'game_site_id', },              //": 20428,
            { name: 'id', },                        //": 74181,
            { name: 'leaguevine_url', },            //": "http://www.playwithlv.com/games/74181/",
            { name: 'resource_uri', },              //": "http://api.playwithlv.com/v1/games/74181/",
            { name: 'start_time', },                //": "2012-06-17T12:00:00+02:00",
            { name: 'team_1_id', },                 //": 19098,
            { name: 'team_1_score', },              //": 13,
            { name: 'team_2_id', },                 //": 19083,
            { name: 'team_2_score', },              //": 15,
            { name: 'time_created', },              //": "2012-06-17T09:09:39.285167+00:00",
            { name: 'time_last_updated', },         //": "2012-06-17T09:09:39.285190+00:00",
            { name: 'timezone', },                  //": "Europe/Amsterdam",
            { name: 'winner_id', },                 //": 19083

            // filtering opts, but cannot be requested in fields.
            { name: 'pool_id', },                   //": null,
            { name: 'pool_round_id', },             //": null,
            { name: 'swiss_round_id', },            //": 17039,
            { name: 'tournament_id', },             //": 18093,
        ],

        proxy: {
            type: 'configurableRest',
            url: 'games/',
            extraParams: {
                fields: [
                    'game_site_id',
                    'id',
                    'leaguevine_url',
                    'resource_uri',
                    'start_time',
                    'team_1_id',
                    'team_1_score',
                    'team_2_id',
                    'team_2_score',
                    'time_created',
                    'time_last_updated',
                    'timezone',
                    'winner_id',
                ]
            },
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
                    model: 'TouchMill.model.GameScore',
                    /*
                    proxy: {
                        type: 'configurableRest',
                        url: 'game_scores/',
                        extraParams: {
                            limit: 1,
                            order_by: '[-is_final,-time_last_updated]',
                            fields: [
                                //'game_id',
                                'team_1_score',
                                'team_2_score',
                                'is_final',
                                'id',
                                'time',
                                'time_last_updated',
                                'what_happened',
                            ],
                        },
                        reader: { type: 'json', rootProperty: 'objects', },
                    },
                    */
                },
            },

            {
                type: 'hasMany',
                model: 'TouchMill.model.SpiritScore',
                name: 'spiritScores', getterName: 'spiritScores', // XXX only keep one, name for hasMany, getterName for hasOne
                autoLoad: true,
                // kill store to revert to original model.
                store: {
                    //model: 'TouchMill.model.SpiritScore',
                    proxy: {
                        type: 'configurableRest',
                        url: 'game_sportsmanship_scores/',
                        extraParams: { limit: 1, order_by: '[-time_last_updated]' },
                        reader: { type: 'json', rootProperty: 'objects', },
                    },
                },
            },

            /*
            {
                type: 'hasOne',
                model: 'TouchMill.model.GameScore',
                getterName: 'gameScores',
                //autoLoad: true,
                // kill store to revert to original model.
                //store: {
                //    model: 'TouchMill.model.GameScore',
                //    proxy: {
                //        type: 'configurableRest',
                //        url: 'game_scores/',
                //        extraParams: {
                //            limit: 1,
                //            order_by: '[-is_final,-time_last_updated]',
                //            fields: [
                //                //'game_id',
                //                'team_1_score',
                //                'team_2_score',
                //                'is_final',
                //                'id',
                //                'time',
                //                'time_last_updated',
                //                'what_happened',
                //            ],
                //        },
                //        reader: { type: 'json', rootProperty: 'objects', },
                //    },
                //},
            },

            {
                type: 'hasOne',
                model: 'TouchMill.model.SpiritScore',
                getterName: 'spiritScores', // XXX only keep one, name for hasMany, getterName for hasOne
                //autoLoad: true,
                // kill store to revert to original model.
                //store: {
                //    model: 'TouchMill.model.SpiritScore',
                //    proxy: {
                //        type: 'configurableRest',
                //        url: 'game_sportsmanship_scores/',
                //        extraParams: { limit: 1, order_by: '[-time_last_updated]' },
                //        reader: { type: 'json', rootProperty: 'objects', },
                //    },
                //},
            },
            */

            {
                type: 'belongsTo',
                model: 'TouchMill.model.Tournament',
                name: 'tournament',
            },
        ],
    },
});
