Ext.define('TouchMill.store.Events', {
    extend  : 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Event',
        autoLoad: true,

        proxy: {
            type: 'ajax',
            url: 'test/data/events.json',     // will change once dynamic
            reader: { type: 'json', },

            // XXX why do these do nothing?
            success: function(response) { console.log('fetched Tournament successfully.'); },
            failure: function(response) { console.log('Tournament fetch failed!'); },
            callback: function(options, success, response) {
                console.log('Events store callback.');
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
            //reader: {
            //    rootProperty: 'results'
            //}
        }
    }
});

