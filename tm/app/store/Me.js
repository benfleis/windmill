Ext.define('TouchMill.store.Me', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Player',

        proxy: {
            type: 'configurableRest',
            url: 'players/me/',
            reader: { type: 'json', },
        },

        listeners: { refresh: 'setMine', },
    },

    // walk the whole store and update 'is_mine' across the board.
    setMine: function() {
        if (this.getCount() > 0){ 
            this.getAt(0).set('is_mine', true);
            console.log('store.Me.setMine() -> is_mine updated');
        }
    },

    getPlayerId: function() {
        return (this.getCount() > 0 && this.getAt(0).data.id) || null;
    },
});
