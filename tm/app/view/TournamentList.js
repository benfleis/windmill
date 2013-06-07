Ext.define('TouchMill.view.TournamentList', {
    extend: 'Ext.List',
    xtype: 'tournamentList',

    config: {
        title: 'Tournaments',
        store: 'Tournaments',
        itemTpl: '{name}',
    },


});
