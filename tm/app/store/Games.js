Ext.define('TouchMill.store.Games', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Game',

        proxy: {
            type: 'configurableRest',
            url: 'games/',
            reader: { type: 'json', rootProperty: 'objects', },
        },

        listeners: {
            refresh: 'setMine',
        },
    },

    // walk the whole store and update 'is_mine' across the board.
    setMine: function() {
        console.log('Games.setMine()');
        var my_tm_ids = Ext.getStore('Teams').getMyTeamIds();
        this.each(function(rec) {
            rec.set('is_mine', !!my_tm_ids[rec.data.team_1_id] || !!my_tm_ids[rec.data.team_2_id]);
        });
    },

    loadByTeamId: function(team_id, opts) {
        console.log('Games.loadByTeamId(' + team_id + ')');
        opts = opts || {};
        opts.params = { team_ids: [team_id] };
        this.load(opts);
    },
});
