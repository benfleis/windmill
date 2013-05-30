Ext.define('TouchMill.view.Events', {
    extend: 'Ext.List',
    xtype: 'events',

    config: {
        iconCls: 'calendar',
        store: 'Events',
        itemTpl: '{name} / <small>{description}</small>',
    },
});
