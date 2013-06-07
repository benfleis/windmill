Ext.define('TouchMill.view.EventList', {
    extend: 'Ext.List',
    xtype: 'eventList',

    config: {
        iconCls: 'calendar',
        store: 'Events',
        itemTpl: '{name} / <small>{description}</small>',
    },
});
