Ext.define('TouchMill.view.GameView', {
    //extend: 'Ext.Carousel',
    extend: 'Ext.Container',
    xtype: 'gameView',

    config: {
        //direction: 'horizontal',
        title: 'Game Summary',
        record: null,
        tpl: [
            '<p>game_id: {id}</p>',
            '<p>{team_1_id} vs. {team_2_id}</p>',
            '<p>{team_1_score} : {team_2_score}</p>',
            '<p>Is Final: {is_final}</p>',
        ].join(''),
/*
        tpl: [
            '<p>game_id: {id}</p>',
            '<p>{team_1_id} vs. {team_2_id}</p>',
            '<p>{team_1_score} : { team_2_score}</p>',
            '<p>Is Final: {is_final}</p>',
        ].join(''),
*/
    },
});
