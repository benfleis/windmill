Ext.define('TouchMill.view.Events', {
    extend: 'Ext.List',
    xtype: 'v_events',

    config: {
        title: 'Events',
        iconCls: 'star',

        itemTpl: '{name} / <small>{description}</small>',
    },
});
