Ext.define('TouchMill.controller.Standings', {
    extend: 'Ext.app.Controller',

    requires: [
        'TouchMill.view.standing.Navigator',
        'TouchMill.view.TournamentList',
        'TouchMill.view.standing.RoundList',
        'TouchMill.view.standing.StandingList',
    ],

    // ------------------------------------------------------------------------

    config: {
        refs: {
            standingNavigator:              'standingNavigator',
            tournamentList:                 'tournamentList[owner=standingNavigator]',
            standingRoundList:              'standingRoundList',
        },

        control: {
            tournamentList:                 { itemtap: 'onSelectTournament', },
            standingRoundList:              { itemtap: 'onSelectRound', },
        },
    },

    // ------------------------------------------------------------------------

    mask: function() { this.getStandingNavigator().setMasked({ xtype: 'loadmask', message: 'Loading...' }); },
    unmask: function() { this.getStandingNavigator().unmask(); },
    push: function(v) { this.getStandingNavigator().push(v); },

    // ------------------------------------------------------------------------

    onSelectTournament: function(list, idx, item, tourney, evt) {
        this.mask();
        var roundList = Ext.create('TouchMill.view.standing.RoundList');
        roundList.getStore().load({
            params: { tournament_id: tourney.get('id'), },
            scope: this,
            callback: function() {
                roundList.tournament_id = tourney.get('id');
                this.unmask();
                this.push(roundList);
            },
        });
    },

    onSelectRound: function(list, idx, item, round, evt) {
        this.mask();
        var standingList = Ext.create('TouchMill.view.standing.StandingList');
        standingList.getStore().load({
            params: { swiss_round_ids: [round.get('id')], },
            scope: this,
            callback: function() {
                standingList.getStore().loadBracketTeamsToTop(
                    this.getStandingRoundList().tournament_id,
                    {
                        scope: this,
                        callback: function() {
                            this.unmask();
                            this.push(standingList);
                        },
                    }
                );
            },
        });
    },

});
