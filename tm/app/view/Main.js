Ext.define('TouchMill.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',

    config: {
        fullscreen: true,

        tabBar: {
            layout: {
                pack: 'center',
                align: 'center',
            },
        },
        tabBarPosition: 'top',

        items: [
            { xtype: 'home', },
            { xtype: 'events', },
            { xtype: 'tournaments', },
            { xtype: 'games', },
        ],
    }
});
