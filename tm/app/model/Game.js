Ext.define('TouchMill.model.Game', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'id',                   type: 'int' },
            { name: 'game_site_id',         type: 'int' },
            { name: 'start_time',           type: 'date' },
            { name: 'team_1_id',            type: 'int' },
            { name: 'team_2_id',            type: 'int' },
            { name: 'team_1_score',         type: 'int' },
            { name: 'team_2_score',         type: 'int' },
            { name: 'time_created',         type: 'date' },
            { name: 'time_last_updated',    type: 'date' },
            { name: 'timezone', },                  //": "Europe/Amsterdam",
            { name: 'winner_id',            type: 'int' },

            // filtering opts, but cannot be requested in fields.
            { name: 'pool_id',              type: 'int' },
            { name: 'pool_round_id',        type: 'int' },
            { name: 'swiss_round_id',       type: 'int' },
            { name: 'tournament_id',        type: 'int' },

            // could be relational, but is already RO and nested:
            { name: 'game_site_name',       mapping: 'game_site.name' },

            // stuff that should work relationally, but doesn't.  i'm
            // disgusted, but doing it anywaiz.  would prefer to try and use
            // this, but no time right now:
            // http://appointsolutions.com/2012/07/using-model-associations-in-sencha-touch-2-and-ext-js-4/
            { name: 'team_1_name', },
            { name: 'team_2_name', },
            { name: 'team_1_short_name', },
            { name: 'team_2_short_name', },
            { name: 'game_score_team_1',    type: 'int' },         // appears redundant w/ score above, but not
            { name: 'game_score_team_2',    type: 'int' },         // appears redundant w/ score above, but not
            { name: 'game_score_is_final',  type: 'bool' },
            { name: 'spirit_score_team_1', },
            { name: 'spirit_score_team_2', },
            { name: 'spirit_comment_team_1', },
            { name: 'spirit_comment_team_2', },

            // I'm gonna hate myself in the morning for selling out to this.
            // There is surely a more sencha sentric way to do this.
            { name: 'team_perspective_id',  type: 'int',    defaultValue: undefined },
        ],

        proxy: {
            type: 'configurableRest',
            url: 'games/',
            extraParams: {
                fields: [
                    'id', 'game_site', 'game_site_id', 'leaguevine_url', 'resource_uri',
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
    stitchAssociations: function(team_perspective_id) {
        // binds associated data; prolly should be done some other way, but
        // don't know how/what/where, can't find ref to proper way to do it.
        this.set('team_perspective_id', team_perspective_id);

        this.getData(true);

        var gameScore = this.gameScores().getCount() ? this.gameScores().getAt(0).getData() : {};
        this.set('game_score_team_1', gameScore.team_1_score);
        this.set('game_score_team_2', gameScore.team_2_score);
        this.set('game_score_is_final', gameScore.is_final);

        var spiritScore = this.spiritScores().getCount() ? this.spiritScores().getAt(0).getData() : {};
        this.set('attitude_score_team_1', spiritScore.team_1_attitude_score);
        this.set('compare_score_team_1', spiritScore.team_1_compare_score);
        this.set('fairness_score_team_1', spiritScore.team_1_fairness_score);
        this.set('fouls_score_team_1', spiritScore.team_1_fouls_score);
        this.set('rules_score_team_1', spiritScore.team_1_rules_score);
        this.set('comment_team_1', spiritScore.team_1_comment);
        this.set('attitude_score_team_2', spiritScore.team_2_attitude_score);
        this.set('compare_score_team_2', spiritScore.team_2_compare_score);
        this.set('fairness_score_team_2', spiritScore.team_2_fairness_score);
        this.set('fouls_score_team_2', spiritScore.team_2_fouls_score);
        this.set('rules_score_team_2', spiritScore.team_2_rules_score);
        this.set('comment_team_2', spiritScore.team_2_comment);

        this.set('team_1_name', this.team1().get('name'));
        this.set('team_1_short_name', this.team1().get('short_name'));
        this.set('team_2_name', this.team2().get('name'));
        this.set('team_2_short_name', this.team2().get('short_name'));
    },
});
