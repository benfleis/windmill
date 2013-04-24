Ext.define('TouchMill.view.GameView', {
    extend: 'Ext.Carousel',
    xtype: 'v_game_view',

    config: {
        iconCls: 'play',

        defaults: {
            styleHtmlContent: true,
        },
        direction: 'horizontal',
        title: 'Game Summary',
        items: [
            {
                html: [
                    '<h2>Field 12 @ 14:00</h2>',
                    '<h3>Game Score</h3>',
                    'Lotus 15 vs. Primavera 8',
                    '<h3>Spirit Score</h3>',
                    'Lotus 3 vs. Primavera 3',
                ].join(''),
            },
            {
                html: [
                    '<h2>Field 2 @ 18:00</h2>',
                    '<h3>Game Score</h3>',
                    'Lotus 9 vs. Viita 12',
                    '<h3>Spirit Score</h3>',
                    'Lotus 2 vs. Viita 4',
                ].join(''),
            },
        ],
        //itemTpl: [
        //    '<h2>{location} @ {time}</h2>',
        //    '<h3>Game Score</h3>',
        //    'Lotus {team_1_game_score} vs. {team_2} {team_2_game_score}',
        //    '<h3>Spirit Score</h3>',
        //    'Lotus {team_1_spirit_score} vs. {team_2} {team_2_spirit_score}',
        //].join(''),
    },
});


