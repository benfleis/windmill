Ext.define('TouchMill.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',

    initialize: function() {
        // toggle login/logout button/page based on current status
        this.add(Config.sessionIsLoggedIn() ?  { xtype: 'logout', } : { xtype: 'login', });
        this.callParent([]);
    },

    config: {
        id: 'main',
        fullscreen: true,

        tabBar: {
            layout: {
                pack: 'center',
                align: 'center',
            },
        },
        tabBarPosition: 'top',

        items: [
            { xtype: 'tournamentNavigator', },
            { xtype: 'eventList', },
        ],
    }
});
