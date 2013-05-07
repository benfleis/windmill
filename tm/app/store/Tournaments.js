Ext.define('TouchMill.store.Tournaments', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Tournament',
        autoLoad: true,

        proxy: {
            type: 'ajax',
            //url: 'test/data/tournaments.json',      // will change once dynamic
            url: 'http://api.playwithlv.com/v1/tournaments/',

            reader: { type: 'json', rootProperty: 'objects', },

            extraParams: {
                access_token: 'a042642c0f',
                tournament_ids: '[18091,18093,18094]',  // XXX need to put this into a config opt
            },

            // The following must be set to disable extra parameters being sent to the API, which breaks it
            //noCache: false,
            //startParam: '',
            //pageParam: '',
            //limitParam: '',

            //extraParams: {
            //    apikey: '8a341f85c657435989e75c9a83294762',
            //    per_page: 'all'
            //},
        }
    }
});

