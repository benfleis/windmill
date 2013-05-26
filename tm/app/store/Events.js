Ext.define('TouchMill.store.Events', {
    extend  : 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Event',

        proxy: {
            type: 'configurableRest',
            url: 'events.json',
            useStaticUrls: true,
            reader: { type: 'json', },
        }
    },
});

