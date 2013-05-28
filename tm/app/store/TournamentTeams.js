Ext.define('TouchMill.store.TournamentTeams', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.TournamentTeam',

        proxy: {
            type: 'configurableRest',
            url: 'tournament_teams/',
            useStaticUrls: true,
            reader: { type: 'json', rootProperty: 'objects' },
        },

        listeners: {
            refresh: function(store, data) {
                //console.log('TournamentTeams: refresh called!');
            },
        },
    },
});
