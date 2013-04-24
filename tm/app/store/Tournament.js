Ext.define('TouchMill.store.Tournament', {
    extend  : 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Tournament',
        //groupField: 'fullTitle',
        autoLoad: true,

        proxy: {
            type: 'ajax',
            url: 'test/data/Tournament.json',   // will change once dynamic
            reader: { type: 'json', },

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

