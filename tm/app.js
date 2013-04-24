Ext.Loader.setConfig({
    enabled: true,
});

Ext.application({
    name: 'TouchMill',

    models: ['Tournament', 'TournamentTeam'],
    views: ['Main', 'Events', 'Games', 'GameView', ],
    controllers: ['Main',],

    launch: function() {
        Ext.create('TouchMill.view.Main');
    },
});
