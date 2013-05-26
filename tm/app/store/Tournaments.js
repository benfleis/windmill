Ext.define('TouchMill.store.Tournaments', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Tournament',

        proxy: {
            type: 'configurableRest',
            url: 'tournaments/',
            useStaticUrls: true,
            reader: { type: 'json', rootProperty: 'objects', },
        },

        listeners: { refresh: function(store, data) { }, },
    },
});
