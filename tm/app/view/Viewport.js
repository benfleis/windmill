Ext.define('TouchMill.view.Viewport', {
    extend: 'Ext.tab.Panel',

    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',
        items: [
            { xtype: 'p_home', },
            { xtype: 'p_team', },
        ],
    }
});
