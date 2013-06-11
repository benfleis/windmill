Ext.define('TouchMill.store.SwissRounds', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.SwissRound',

        proxy: {
            type: 'configurableRest',
            url: 'swiss_rounds/',
            extraParams: {
                fields: [
                    'id', 'round_number', 'tournament_id', 'visibility',
                    'start_time', 'time_created', 'time_last_updated',
                ],
            },
            reader: { type: 'json', rootProperty: 'objects', },
        },

        sorters: [ { property: 'round_number', direction: 'DESC' }, ],
    },

    // ------------------------------------------------------------------------

    //
    // loads all Teams that exist in the current (filtered view?) of the
    // TournamentTeams store
    //
    loadByTournamentId: function(opts) {
        var team_ids = [];
        Ext.getStore('TournamentTeams').each(function(rec) { team_ids.push(rec.data.team_id); });
        opts = opts || {};
        opts.params = { team_ids: team_ids };
        this.load(opts);
    },
});

