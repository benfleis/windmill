Ext.define('TouchMill.view.Tournaments', {
    extend: 'Ext.List',
    xtype: 'tournaments',

    config: {
        title: 'Tournaments',
        store: 'Tournaments',
        itemTpl: '{name}',
    },


});
