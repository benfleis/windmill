Ext.define('TouchMill.view.Tournaments', {
    extend: 'Ext.List',
    xtype: 'v_tournaments',

    config: {
        iconCls: 'star',
        store: 'Tournaments',
        itemTpl: '{name} / <small>format: {scheduling_format}</small>',
    },
});
