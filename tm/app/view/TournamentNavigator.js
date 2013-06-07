Ext.define('TouchMill.view.TournamentNavigator', {
    extend: 'Ext.navigation.View',
    xtype: 'tournamentNavigator',

    requires: [
        'TouchMill.view.TournamentList',
        'TouchMill.view.TeamList',
        'TouchMill.view.game.List',
        'TouchMill.view.game.Details',
    ],

    config: {
        iconCls: 'star',
        items: [ { xtype: 'tournamentList', }, ],
    },
});

