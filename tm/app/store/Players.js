Ext.define('TouchMill.store.Players', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Player',

        proxy: {
            type: 'configurableRest',
            url: 'players/',
            reader: { type: 'json', rootProperty: 'objects', },
        },

        listeners: {
            refresh: 'setMine',
        },
    },

    // walk the whole store and update 'is_mine' across the board.
    setMine: function() {
        console.log('Players.setMine()');
        var my_player_id = Ext.getStore('Me').getPlayerId();
        this.each(function(rec) {
            rec.set('is_mine', my_player_id !== null && rec.data.id === my_player_id);
        });
    },

});

