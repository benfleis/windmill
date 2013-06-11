Ext.define('TouchMill.store.SwissStandings', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.SwissStanding',

        proxy: {
            type: 'configurableRest',
            url: 'swiss_rounds/',
            extraParams: { limit: 200, fields: [ 'standings' ], },
            reader: { type: 'json', rootProperty: 'objects[0].standings', },
        },

        sorters: [ { property: 'ranking', direction: 'ASC' }, ],
    },

});

