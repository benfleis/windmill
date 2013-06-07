Ext.define('TouchMill.store.SpiritScores', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.SpiritScore',
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

});


