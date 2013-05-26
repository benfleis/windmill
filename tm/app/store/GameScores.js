Ext.define('TouchMill.store.GameScores', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.GameScore',

        proxy: {
            type: 'configurableRest',
            url: 'game_scores/',
            reader: { type: 'json', rootProperty: 'objects', },
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

    loadByGameId: function(game_id, callback) {

    },

    loadByTeamId: function(team_id, callback) {
        //this.load({
            //params: _.extend({}, TouchMill.app.options.proxy_params, { team_ids: '[' + team_id + ']' }),
            //callback: callback,
        //});
    },

    getByTeamId: function(team_id) {

    },
});
