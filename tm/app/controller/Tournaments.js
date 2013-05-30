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
        },

        control: {
            tournaments: {
                itemtap: 'onTournamentSelect',
            },
            teams: {
                itemtap: 'onTeamSelect',
            },
            games: {
                itemtap: 'onGameSelect',
            },
        },
    },

    // ------------------------------------------------------------------------

    onTournamentSelect: function(list, idx, item, tourney, evt) {
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

    onTeamSelect: function(list, idx, item, team, evt) {
        var gamesView = Ext.create('TouchMill.view.Games');
        var teamId = team.get('id');
        gamesView.getStore().clearFilter();
        gamesView.getStore().loadByTeamId(team.get('id'),
            { scope: this, callback: function() { this.getTournamentNavigator().push(gamesView); }, });
    },

    onGameSelect: function(list, idx, item, game, evt) {
        var gameView = this.getGameView();
        if (!gameView) {
            console.log('->  instantiate GameView');
            gameView = Ext.create('TouchMill.view.GameView');
        }

        var loaded = 0;
        var maybePushGameView = function() { if (++loaded == 2) this.getTournamentNavigator().push(gameView); }.bind(this);
        gameView.setRecord(game);

        game.spiritScores().load({
            params: { game_id: game.data.id, limit: 1, },
            scope: this,
            callback: function(spiritScores) {
                console.log('LOADED spiritScores!');
                console.log(spiritScores);
                maybePushGameView();
            },
        });
        game.gameScores().load({
            params: { game_id: game.data.id, limit: 1, },
            scope: this,
            callback: function(gameScores) {
                console.log('LOADED gameScores!');
                console.log(gameScores);
                maybePushGameView();
            },
        });
    },
});
