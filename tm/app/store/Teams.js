Ext.define('TouchMill.store.Teams', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.Team',

        proxy: {
            type: 'configurableRest',
            url: 'teams/',
            useStaticUrls: true,
            reader: { type: 'json', rootProperty: 'objects', },
        },

        listeners: {
            refresh: 'setMine',
        },

    },

    // walk the whole store and update 'is_mine' across the board.
    setMine: function() {
        var my_tm_ids = Ext.getStore('TeamPlayers').getMyTeamIds();
        this.each(function(rec) {
            rec.set('is_mine', !!my_tm_ids[rec.data.id]);
        });
        //console.log('Teams.setMine() ->');
        //console.log(this.getMyTeamIds());
    },

    // NOTE: this differs from TeamPlayers.getMyTeamIds() in that these are all
    // Windmill Team IDs -- the 'Me' player team ids in TeamPlayers may not all
    // belong to Windmill Tourneys.
    getMyTeamIds: function() {
        var tms = this.getMyTeams();
        var tm_ids = {};
        tms.each(function(rec) {
            var id = rec.data.id;
            tm_ids[id] = id;
        });
        //console.log('Teams.getMyTeamIds() ->');
        //console.log(tm_ids);
        return tm_ids;
    },

    getMyTeams: function() {
        //console.log('Teams.getMyTeams()');
        return Ext.getStore('Teams').queryBy(function(rec) { return rec.data.is_mine; });
    },

    // ------------------------------------------------------------------------

    //
    // loads all Teams that exist in the current (filtered view?) of the
    // TournamentTeams store
    //
    loadByTournamentTeamsStore: function(opts) {
        var team_ids = [];
        Ext.getStore('TournamentTeams').each(function(rec) { team_ids.push(rec.data.team_id); });
        opts = opts || {};
        opts.params = { team_ids: team_ids };
        this.load(opts);
    },
});

