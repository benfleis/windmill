Ext.define('TouchMill.view.Events', {
    extend: 'Ext.List',
    xtype: 'events',

    config: {
        iconCls: 'star',
        store: 'Events',
        itemTpl: '{name} / <small>{description}</small>',
    },
});
