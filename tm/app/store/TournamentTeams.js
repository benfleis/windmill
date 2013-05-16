Ext.define('TouchMill.store.TournamentTeams', {
    extend: 'Ext.data.Store',

    requires: [
        'TouchMill.model.TournamentTeam'
    ],

    config: {
        model: 'TouchMill.model.TournamentTeam',
        autoLoad: true,

        proxy: {
            type: 'ajax',
            url: 'test/data/TournamentTeams.json',
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
