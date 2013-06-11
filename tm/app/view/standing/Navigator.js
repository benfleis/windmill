Ext.define('TouchMill.view.standing.Navigator', {
    extend: 'Ext.navigation.View',
    xtype: 'standingNavigator',

    requires: [
        'TouchMill.view.TournamentList',
        'TouchMill.view.standing.RoundList',
        'TouchMill.view.standing.StandingList',
    ],

    config: {
        id: 'standingNavigator',
        iconCls: 'list',
        title: 'Standings',

        items: [ { xtype: 'tournamentList', owner: 'standingNavigator' }, ],
    },
});

