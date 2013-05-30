/*
Ext.define('TouchMill.store.GameScores', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.GameScore',

        proxy: {
            type: 'configurableRest',
            url: 'game_scores/',
            reader: { type: 'json', rootProperty: 'objects', },

            // remote sort param
            extraParams: { order_by: '[-is_final,-time_last_updated]' },
        },


        listeners: {
            refresh: 'setMine',
        },
    },

    // walk the whole store and update 'is_mine' across the board.
    setMine: function() {
        console.log('GameScores.setMine()');
        var my_tm_ids = Ext.getStore('Teams').getMyTeamIds();
        this.each(function(rec) {
            rec.set('is_mine', !!my_tm_ids[rec.data.team_1_id] || !!my_tm_ids[rec.data.team_2_id]);
        });
    },

    loadByGameId: function(game_id, opts) {
        opts = opts || {};
        opts.params = { game_id: game_id };
        this.load(opts);
    },

    getByGameId: function(game_id) {
        console.log("Just use .findRecord('game_id', game_id)");
        this.findRecord('game_id', game_id);
    },

    loadByTeamId: function(team_id, opts) {
        opts = opts || {};
        opts.params = { team_ids: [team_id] };
        this.load(opts);
    },

});
*/
