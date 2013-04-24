Ext.define('TouchMill.store.Players', {
    extend: 'Ext.data.Store',

    requires: [
        'TouchMill.model.Player'
    ],

    config: {
        model: 'TouchMill.model.Player',
        autoLoad: true,

        proxy: {
            type: 'ajax',
            url: 'test/data/Players.json',
            reader: {
                type: 'json',
                rootProperty: 'guests'
            }
        },

        //sorters: [{
        //    property : 'guestName',
        //    direction: 'ASC'
        //}]

    }
});
