Ext.define('TouchMill.model.Game', {
    extend: 'Ext.data.Model',
    //extend: 'TouchMill.data.StitchingModel',

    config: {
        fields: [
            { name: 'id', },                        //": 74181,
            { name: 'game_site_id', },              //": 20428,
            //{ name: 'leaguevine_url', },            //": "http://www.playwithlv.com/games/74181/",
            //{ name: 'resource_uri', },              //": "http://api.playwithlv.com/v1/games/74181/",
            { name: 'start_time', },                //": "2012-06-17T12:00:00+02:00",
            { name: 'team_1_id', },                 //": 19098,
            //{ name: 'team_1_score', },              //": 13,
            { name: 'team_2_id', },                 //": 19083,
            //{ name: 'team_2_score', },              //": 15,
            { name: 'time_created', },              //": "2012-06-17T09:09:39.285167+00:00",
            { name: 'time_last_updated', },         //": "2012-06-17T09:09:39.285190+00:00",
            { name: 'timezone', },                  //": "Europe/Amsterdam",
            { name: 'winner_id', },                 //": 19083

            // filtering opts, but cannot be requested in fields.
            { name: 'pool_id', },                   //": null,
            { name: 'pool_round_id', },             //": null,
            { name: 'swiss_round_id', },            //": 17039,
            { name: 'tournament_id', },             //": 18093,

            // stuff that should work relationally, but doesn't.  i'm
            // disgusted, but doing it anywaiz.  would prefer to try and use
            // this, but no time right now:
            // http://appointsolutions.com/2012/07/using-model-associations-in-sencha-touch-2-and-ext-js-4/
            { name: 'team_1_name', },
            { name: 'team_2_name', },
            { name: 'team_1_short_name', },
            { name: 'team_2_short_name', },
            { name: 'game_score_team_1', },         // appears redundant w/ score above, but not
            { name: 'game_score_team_2', },         // appears redundant w/ score above, but not
            { name: 'game_score_is_final', },
            { name: 'spirit_score_team_1', },
            { name: 'spirit_score_team_2', },
            { name: 'spirit_comment_team_1', },
            { name: 'spirit_comment_team_2', },
        ],

        proxy: {
            type: 'configurableRest',
            url: 'games/',
            extraParams: {
                fields: [
                    'id', 'game_site_id', 'leaguevine_url', 'resource_uri',
                    'start_time', 'team_1_id', 'team_1_score',
                    'team_2_id', 'team_2_score', 'time_created',
                    'time_last_updated', 'timezone', 'winner_id',
                ]
            },
            reader: { type: 'json', rootProperty: 'objects', },
        },

        associations: [
            // HasMany versions, but we always just use one.
            { type: 'hasMany', model: 'TouchMill.model.GameScore', name: 'gameScores', },
            { type: 'hasMany', model: 'TouchMill.model.SpiritScore', name: 'spiritScores' },

            //{
            //    type: 'hasOne',
            //    model: 'TouchMill.model.GameScore',
            //    name: 'gameScore',
            //    froglegs: true,
            //},

            //{
            //    type: 'hasOne',
            //    model: 'TouchMill.model.SpiritScore',
            //    name: 'spiritScores'
            //},

            // http://www.sencha.com/forum/showthread.php?241701-hasOne-association
            // http://www.sencha.com/forum/showthread.php?184104-Working-with-associated-models-2-One-to-One-Association-collision
            {
                type: 'hasOne',
                model: 'TouchMill.model.Team',
                name: 'team_1',
                instanceName: 'team_1',
                associationKey: 'team_1_id',
                //store: 'TouchMill.store.Teams',
                getterName: 'team1',
                setterName: 'setTeam1',
                //foreignKey: 'id',     BREAKS SHIT.  turns game.id into a sencha internal id
            },
            {
                type: 'hasOne',
                model: 'TouchMill.model.Team',
                instanceName: 'team_2',
                associationKey: 'team_2_id',
                //store: 'TouchMill.store.Teams',
                getterName: 'team2',
                setterName: 'setTeam2',
                //foreignKey: 'id',     BREAKS SHIT.  turns game.id into a sencha internal id
            },


            {
                type: 'belongsTo',
                model: 'TouchMill.model.Tournament',
                name: 'tournament',
            },
        ],
    },

    // only call after all associated data is loaded/set
    stitchAssociations: function() {
        this.getData(true);         // binds associated data; I think this should be done some other way, but don't know how/what/where, can't find reference to proper way to do it.

        var gameScore = this.gameScores().getAt(0).getData(true);
        this.set('game_score_team_1', gameScore.team_1_score);
        this.set('game_score_team_2', gameScore.team_2_score);
        this.set('game_score_is_final', gameScore.is_final);

        var spiritScore = this.spiritScores().getAt(0).getData();
        this.set('spirit_score_team_1', spiritScore.team_1_score);
        this.set('spirit_score_team_2', spiritScore.team_2_score);

        this.set('team_1_name', this.team1().get('name'));
        this.set('team_1_short_name', this.team1().get('short_name'));
        this.set('team_2_name', this.team2().get('name'));
        this.set('team_2_short_name', this.team2().get('short_name'));
    },
});
