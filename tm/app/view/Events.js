Ext.define('TouchMill.view.Events', {
    extend: 'Ext.List',
    xtype: 'v_events',

    config: {
        iconCls: 'star',
        store: 'Events',
        itemTpl: '{name} / <small>{description}</small>',
    },
});
