Ext.define('TouchMill.controller.Tournaments', {
    extend: 'Ext.app.Controller',

    requires: [
        'TouchMill.view.TournamentNavigator',
        'TouchMill.view.Tournaments',
        'TouchMill.view.Teams',
        'TouchMill.view.Games',
        'TouchMill.view.GameView',
    ],

    // ------------------------------------------------------------------------

    config: {
        refs: {
            tournamentNavigator: 'tournamentnavigator',
            tournaments: 'tournaments',
            teams: 'teams',
            games: 'games',
            gameView: 'gameView',

            addGameScoreButton:     'button[action=addScore]',
            addGameSpiritButton:    'button[action=addSpirit]',
            submitGameScoreButton:  'button[action=submitScore]',
            submitGameSpiritButton: 'button[action=submitSpirit]',
        },

        control: {
            tournaments:            { itemtap: 'onSelectTournament', },
            teams:                  { itemtap: 'onSelectTeam', },
            games:                  { itemtap: 'onSelectGame', },

            addGameScoreButton:     { tap: 'onTapAddScore' },
            addGameSpiritButton:    { tap: 'onTapAddSpirit' },
            submitGameSpiritButton: { tap: 'onTapSubmitSpirit' },
            submitGameScoreButton:  { tap: 'onTapSubmitScore' },
        },
    },

    // ------------------------------------------------------------------------

    onSelectTournament: function(list, idx, item, tourney, evt) {
        // convert tourneyId into teamIds
        var tourneyId = tourney.get('id');
        var teamIds = {};
        Ext.getStore('TournamentTeams').each(function(r) {
            if (r.get('tournament_id') === tourneyId)
                teamIds[r.get('team_id')] = true;
        });
        var teamsView = Ext.create('TouchMill.view.Teams');
        teamsView.getStore().clearFilter();
        teamsView.getStore().filterBy(function(r) { return teamIds[r.get('id')]; });
        this.getTournamentNavigator().push(teamsView);
    },

    onSelectTeam: function(list, idx, item, team, evt) {
        var gamesView = Ext.create('TouchMill.view.Games');
        var teamId = team.get('id');
        gamesView.getStore().clearFilter();
        gamesView.getStore().loadByTeamId(team.get('id'),
            { scope: this, callback: function() { this.getTournamentNavigator().push(gamesView); }, });
    },

    onSelectGame: function(list, idx, item, game, evt) {
        var gameView = this.getGameView();
        if (!gameView) {
            console.log('->  instantiate GameView');
            gameView = Ext.create('TouchMill.view.GameView');
        }

        var loaded = 0;
        var maybePushGameView;
        this.getTournamentNavigator().push(gameView);
        gameView.setMasked({ xtype: 'loadmask', message: 'Loading...' });

        game.gameScores().load({
            params: { game_id: game.data.id, limit: 1, },
            scope: this,
            callback: function(gameScores) {
                console.log('LOADED gameScores!');
                console.log(game.gameScores());
                maybePushGameView();
            },
        });
        game.spiritScores().load({
            params: { game_id: game.data.id, limit: 1, },
            scope: this,
            callback: function(spiritScores) {
                console.log('LOADED spiritScores!');
                console.log(game.spiritScores());
                maybePushGameView();
            },
        });

        maybePushGameView = function() {
            if (++loaded == 2) {
                var items = gameView.getItems();
                var data = game.getData(true);      // binds associated data; I think this should be done some other way, but don't know how/what/where, can't find reference to proper way to do it.
                items.each(function(i) { i.setRecord(game); }); // really?  shouldn't this automatically get recursively applied?
                //gameView.setRecord(gameview.gameScores.getAt(0));
                gameView.unmask();
            }
        }.bind(this);
    },

    onTapAddScore: function() {
        // XXX unused
        console.log('onTapAddScore');
        //this.getGameView().showAddScore();
    },

    onTapSubmitScore: function() {
        console.log('onTapSubmitScore');
        var gameView = this.getGameView();
        console.log(gameView);
        //var scoreForm = Ext.getCmp('gameView');
        var values = gameView.getValues();
        var gameScore = Ext.create('TouchMill.model.GameScore', values);
        console.log(values);
        console.log(gameScore);
        gameView.hideAddScore();
    },

    onTapAddSpirit: function() {
        this.getGameView().showAddSpirit(true);
    },

    onTapSubmitSpirit: function() {
        console.log('onTapSubmitSpirit');
    },
});
