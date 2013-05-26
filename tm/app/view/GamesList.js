Ext.define('TouchMill.view.GamesList', {
    extend: 'Ext.List',
    xtype: 'gamesList',

    config: {
        title: 'My Games',
        store: 'Games',
        itemTpl: '{team_1_id} vs. {team_2_id}<br/><small>{start_time} @ {game_site_id}</small>',
    },
});


