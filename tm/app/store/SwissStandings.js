Ext.define('TouchMill.store.SwissStandings', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.SwissStanding',

        proxy: {
            type: 'configurableRest',
            url: 'swiss_rounds/',
            extraParams: { limit: 200, fields: [ 'standings' ], },
            reader: { type: 'json', rootProperty: 'objects[0].standings', },
        },

        sorters: [
            { property: 'ranking', direction: 'ASC' },
            { property: 'team_short_name', direction: 'ASC' },
        ],

        listeners: {
            refresh: 'addMissingTeamsToTop',
        },
    },

    loadBracketTeamsToTop: function(tournament_id, opts) {
        // get the set of all teams for this tournament, and get the set of
        // teams for this tournament.  all that don't exist get added with a
        // higher ranking
        var standings = Ext.getStore('SwissStandings');
        var standingsTeamIds = {};
        standings.each(function(standing) { standingsTeamIds[standing.get('team_id')] = true; });

        var tourneyTeams = Ext.getStore('TournamentTeams');
        tourneyTeams.clearFilter();
        tourneyTeams.filter('tournament_id', tournament_id);
        if (standingsTeamIds.length === tourneyTeams.getCount())
            return;
        var teams = Ext.getStore('Teams');
        var dummyId = 0;
        teams.loadByTournamentTeamsStore({
            callback: function(recs) {
                var toAdd = [];
                _.each(recs, function(team) {
                    var team_id = team.get('id');
                    if (standingsTeamIds[team_id])
                        return;
                    var tourneyTeam = tourneyTeams.findRecord('team_id', team_id);
                    if (!tourneyTeam || tourneyTeam.get('tournament_id') != tournament_id)
                        return;
                    toAdd.push({
                        id: --dummyId,
                        ranking: 1, //'P',
                        wins: team.get('wins'),
                        losses: team.get('losses'),
                        swiss_score: 0,
                        team_id: team_id,
                        team_name: team.get('name'),
                        team_short_name: team.get('short_name'),
                    });
                });
                standings.each(function(standing) { standing.set('ranking', parseInt(standing.get('ranking')) + toAdd.length); });
                toAdd.sort(function(a, b) { return a.team_short_name < b.team_short_name ? -1 : 1; });
                standings.insert(0, toAdd);

                if (opts.callback)
                    opts.callback.call(opts.scope || this, standings.getRange());
            },
            scope: this,
        });

        // XXX Sort
    },
});

