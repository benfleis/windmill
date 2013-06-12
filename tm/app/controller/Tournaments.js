(function() {

function makeOnTapSubmitSpirit(num) {
    function validateSpiritScore(ss) {
        vals = JSON.parse(ss.get('team_' + num + '_score'));
        if (!vals)
            return false;
        for (var i = 0; i < vals.length; i++)
            if (!(vals[i] === 0 || vals[i] > 0))
                return false;
        return true;
    };

    //
    // This is a bit trickier.  If they already exist, we need to copy the last
    // set of spirit scores, and override the new values.  That way we don't
    // blow away the spirit scores received by other team.  So, we must do merge
    // this thing.
    //
    return function() {
        console.log('onTapSubmitSpirit' + num);
        var gameDetails = this.getGameDetails();
        var spiritScores = gameDetails.getRecord().spiritScores();
        var prevSS = spiritScores.getCount() > 0 ? spiritScores.getAt(0).getData() : {};
        var curSS = gameDetails.getValues();
        var spirit = Ext.Object.merge(
            {}, prevSS, gameDetails['getGameSpirit' + num + 'Values']());
        delete spirit.id;
        var spiritScore = Ext.create('TouchMill.model.SpiritScore', spirit);
        spiritScore.encodeScores();
        if (validateSpiritScore(spiritScore)) {
            Config.addAuthorizationHeaderToProxy(spiritScore.getProxy());
            spiritScore.save({
                failure: function(gs, operation) {
                    // can I inspect the operation and log the failure?  email it? post it?
                    console.log('SpiritScore save failed!');
                    this.unmask();
                    Ext.Msg.alert('Submit FAILED', 'Find a Windmill Tech Nerd and ask for help!');
                }.bind(this),
                success: function() {
                    gameDetails['hideEditSpirit' + num]();
                    this.unmask();
                    Ext.Msg.alert('Spirit scores submitted!');
                }.bind(this),
            });
        }
        else {
            spiritScore.destroy();
            this.unmask();
            Ext.Msg.alert('Spirit scores incomplete!');
        }
    };
}

Ext.define('TouchMill.controller.Tournaments', {
    extend: 'Ext.app.Controller',

    requires: [
        'TouchMill.view.TournamentNavigator',
        'TouchMill.view.TournamentList',
        'TouchMill.view.TeamList',
        'TouchMill.view.game.List',
        'TouchMill.view.game.Details',
    ],

    // ------------------------------------------------------------------------

    config: {
        refs: {
            tournamentNavigator:            'tournamentNavigator',
            tournamentList:                 'tournamentList[owner=tournamentNavigator]',
            teamList:                       'teamList',
            gameList:                       'gameList',
            gameDetails:                    'gameDetails',

            submitScoreButton:              'button[action=submitScore]',
            submitSpiritTeam1Button:        'button[action=submitSpirit1]',
            submitSpiritTeam2Button:        'button[action=submitSpirit2]',
        },

        control: {
            tournamentList:                 { itemtap: 'onSelectTournament', },
            teamList:                       { itemtap: 'onSelectTeam', },
            gameList:                       { itemtap: 'onSelectGame', },

            submitScoreButton:              { tap: 'onTapSubmitScore' },
            submitSpiritTeam1Button:        { tap: 'onTapSubmitSpirit1' },
            submitSpiritTeam2Button:        { tap: 'onTapSubmitSpirit2' },
        },
    },

    // ------------------------------------------------------------------------

    mask: function() { this.getTournamentNavigator().setMasked({ xtype: 'loadmask', message: 'Loading...' }); },
    unmask: function() { this.getTournamentNavigator().unmask(); },

    // ------------------------------------------------------------------------

    onSelectTournament: function(list, idx, item, tourney, evt) {
        // convert tourneyId into teamIds
        var tourneyId = tourney.get('id');
        var teamIds = {};
        Ext.getStore('TournamentTeams').each(function(r) {
            if (r.get('tournament_id') === tourneyId)
                teamIds[r.get('team_id')] = true;
        });
        var teamsList = Ext.create('TouchMill.view.TeamList');
        teamsList.getStore().clearFilter();
        teamsList.getStore().filterBy(function(r) { return teamIds[r.get('id')]; });
        teamsList.setTitle(tourney.get('name').split(' ')[3] + ' Teams');
        this.getTournamentNavigator().push(teamsList);
    },

    onSelectTeam: function(list, idx, item, team, evt) {
        this.mask();
        var teamId = team.get('id');
        var gameList = Ext.create('TouchMill.view.game.List');
        gameList.getStore().loadByTeamId(teamId, {
            scope: this,
            callback: function() {
                this.unmask();
                gameList.setTitle(team.get('short_name'));
                this.getTournamentNavigator().push(gameList);
            },
        });
    },

    onSelectGame: function(list, idx, item, game, evt) {
        this.mask();
        var loaded = 0;
        var maybePushGameDetails = function() {
            if (++loaded == 2) {
                game.stitchAssociations(this.getTeamList().selected.get(0).get('id'));
                var gameDetails = Ext.create('TouchMill.view.game.Details', { record: game });
                this.unmask();
                this.getTournamentNavigator().push(gameDetails);
            }
        }.bind(this);

        game.gameScores().load({
            params: { game_id: game.get('id'), limit: 1, },
            scope: this,
            callback: function(gameScores) {
                console.log('LOADED gameScores from ' + game.get('id'));
                console.log(game.gameScores());
                maybePushGameDetails();
            },
        });
        game.spiritScores().load({
            params: { game_id: game.get('id'), limit: 1, },
            scope: this,
            callback: function(spiritScores) {
                console.log('LOADED spiritScores from ' + game.get('id'));
                console.log(game.spiritScores());
                maybePushGameDetails();
            },
        });
    },

    onTapSubmitScore: function() {
        var gameDetails = this.getGameDetails();
        var vals = gameDetails.getGameScoreValues();
        var submit = function() {
            this.mask();
            var gameScore = Ext.create('TouchMill.model.GameScore', vals)
            Config.addAuthorizationHeaderToProxy(gameScore.getProxy());
            gameScore.save({
                failure: function(gs, operation) {
                    // can I inspect the operation and log the failure?  email it?
                    // post it?
                    console.log('GameScore save failed!');
                    this.unmask();
                    Ext.Msg.alert('Submit FAILED', 'Find a Windmill Tech Nerd and ask for help!');
                }.bind(this),
                success: function() {
                    var game = gameDetails.getRecord();
                    game.set('game_score_team_1', vals.team_1_score);
                    game.set('game_score_team_2', vals.team_2_score);
                    game.set('game_score_is_final', vals.is_final);
                    this.unmask();
                    gameDetails.showViewScore();
                }.bind(this),
            });
        }.bind(this);
        if (vals.is_final) {
            Ext.Msg.confirm('Score IS FINAL?', 'Is it really final?  This is serious business!', function(answer) {
                if (answer === 'yes')
                    submit();
            });
        }
        else {
            submit();
        }
    },

    onTapSubmitSpirit1: makeOnTapSubmitSpirit(1),
    onTapSubmitSpirit2: makeOnTapSubmitSpirit(2),
});

})();
