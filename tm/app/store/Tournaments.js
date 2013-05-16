Ext.define('TouchMill.store.Tournaments', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Tournament',
        autoLoad: false,

        proxy: {
            type: 'ajax',
            //url: 'test/data/tournaments.json',      // will change once dynamic
            url: 'https://api.leaguevine.com/v1/tournaments/',

            reader: { type: 'json', rootProperty: 'objects', },

            extraParams: {
                access_token: '91bd68e2a1',
                tournament_ids: '[18091,18093,18094]',  // XXX need to put this into a config opt
            },
        },
    },
});

