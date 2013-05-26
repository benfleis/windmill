Ext.define('TouchMill.view.Games', {
    extend: 'Ext.navigation.View',
    xtype: 'games',
    requires: [
        'TouchMill.view.GamesList',
        'TouchMill.view.GameView',
    ],

    config: {
        iconCls: 'calendar2',
        items: [
            { xtype: 'gamesList', },
        ],
    },
});

