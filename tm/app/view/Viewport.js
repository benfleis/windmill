Ext.define('TouchMill.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'p_main',

    config: {
        activeTab: 0,
        tabBar: {
            layout: {
                pack: 'center',
                align: 'center',
            },
        },
        fullscreen: true,
        tabBarPosition: 'bottom',
        items: [
            {
                title: 'Home',
                iconCls: 'home',
                html: [
                    '<img src="http://staging.sencha.com/img/sencha.png" />',
                    '<h1>Welcome</h1>',
                    '<p>You are here.</p>',
                ].join(''),
            },
        ],
    }
});
