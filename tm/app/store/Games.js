Ext.define('TouchMill.store.Games', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Game',

        listeners: {
            refresh: 'bindAssociatedStaticData',
        },
    },

    bindAssociatedStaticData: function(recs) {
        console.log('setTeams()');
        recs.each(function(game) {
            // works, but not in templates???
            game.setTeam1(Ext.getStore('Teams').findRecord('id', game.get('team_1_id')))
            game.setTeam2(Ext.getStore('Teams').findRecord('id', game.get('team_2_id')))
            game.set('team_1_name', game.team1().get('name'));
            game.set('team_1_short_name', game.team1().get('short_name'));
            game.set('team_2_name', game.team2().get('name'));
            game.set('team_2_short_name', game.team2().get('short_name'));
            // model.Game.stitchAssociations() does the rest after the
            // dynamically loaded data is available.
        });
    },

    loadByTeamId: function(team_id, opts) {
        console.log('Games.loadByTeamId(' + team_id + ')');
        opts = opts || {};
        opts.params = { team_ids: [team_id] };
        this.load(opts);
    },
});
