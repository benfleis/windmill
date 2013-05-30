Ext.define('TouchMill.view.GameNavigator', {
    extend: 'Ext.navigation.View',
    xtype: 'gameNavigator',
    requires: [
        'TouchMill.view.Games',
        'TouchMill.view.GameView',
    ],

    config: {
        iconCls: 'calendar',
        items: [
            { xtype: 'games', },
        ],
    },
});

