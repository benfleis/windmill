Ext.define('TouchMill.view.Teams', {
    extend: 'Ext.List',
    xtype: 'teams',

    config: {
        title: 'Teams',
        store: 'Teams',
        itemTpl: '{name}: {city}, {country}',
    },
});
