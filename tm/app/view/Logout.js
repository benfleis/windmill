Ext.define('TouchMill.view.Logout', {
    extend: 'Ext.Panel',
    xtype: 'logout',

    initialize: function() {
    },

    config: {
        id: 'logout',
        iconCls: 'delete',
        title: 'Logout',
        html: 'Logging out of LeagueVine...',
    },
});
