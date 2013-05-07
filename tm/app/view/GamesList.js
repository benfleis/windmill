Ext.define('TouchMill.view.GamesList', {
    extend: 'Ext.List',
    xtype: 'v_games_list',
    //requires: 'TouchMill.store.Games',

    config: {
        //title: 'GamesList',
        itemTpl: '{team_1} vs. {team_2}<br/><small>{time} @ {location}</small>',
        onItemDisclosure: true,
    },
});


