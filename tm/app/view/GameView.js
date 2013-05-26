Ext.define('TouchMill.view.GameView', {
    //extend: 'Ext.Carousel',
    extend: 'Ext.Container',
    xtype: 'gameView',

    config: {
        //direction: 'horizontal',
        title: 'Game Summary',
        record: null,
        tpl: '<h1>{team_1_id}</h1>\n<h1>{team_2_id}</h1>',
    },
});


