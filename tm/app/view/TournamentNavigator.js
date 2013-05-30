Ext.define('TouchMill.view.TournamentNavigator', {
    extend: 'Ext.navigation.View',
    xtype: 'tournamentnavigator',

    requires: [
        'TouchMill.view.Tournaments',
        'TouchMill.view.Teams',
        'TouchMill.view.Games',
        'TouchMill.view.GameView',
    ],

    config: {
        iconCls: 'star',
        items: [ { xtype: 'tournaments', }, ],
    },
});

