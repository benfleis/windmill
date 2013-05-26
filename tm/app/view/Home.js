Ext.define('TouchMill.view.Home', {
    extend: 'Ext.Panel',
    xtype: 'home',

    config: {
        iconCls: 'home',
        items: [
            { html: 'Next Event: FOOBAR', },
            {
                html: 'Next Game: ASDF vs. Boxers',
            },
            { html: 'Standings', },
            { html: 'Schedule', },
        ],
    },

});

