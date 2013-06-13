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
        id: 'tournamentNavigator',
        iconCls: 'team',     // make sth else if not logged in?
        title: 'Scores',
        items: [ { xtype: 'tournamentList', owner: 'tournamentNavigator' }, ],
    },
});

