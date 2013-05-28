Ext.define('TouchMill.store.TeamPlayers', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TouchMill.model.TeamPlayer',

        proxy: {
            type: 'configurableRest',
            url: 'team_players/',
            reader: { type: 'json', rootProperty: 'objects', },
        },

        listeners: {
            refresh: 'setMine',
        },
    },

    //
    // NOTE: This is the only store that should ever contain records that are *not*
    // guaranteed to be bound to a Windmill Tournament entry.  We could probably
    // just delete the non-windmill entries upon a refresh, but aren't doing that
    // currently.
    //

    // walk the whole store and update 'is_mine' across the board.
    setMine: function() {
        var my_player_id = Ext.getStore('Me').getPlayerId();
        this.each(function(rec) {
            rec.set('is_mine', rec.data.player_id === my_player_id);
        });
        //console.log('TeamPlayers.setMine() ->');
        //console.log(this.getMyTeamIds());
        Ext.getStore('Teams').setMine();    // trigger refresh on Teams
    },

    getMyTeamIds: function() {
        var tm_plyrs = this.queryBy(function(rec) { return rec.data.is_mine; });
        var tm_ids = {};
        tm_plyrs.each(function(rec) { var id = rec.data.team_id; tm_ids[id] = id; });
        //console.log('TeamPlayers.getMyTeamIds() ->');
        //console.log(tm_ids);
        return tm_ids;
    },

    loadByPlayerId: function(id, opts) {
        opts = opts || {};
        opts.params = { player_ids: [id] };
        Ext.getStore('TeamPlayers').load(opts);
    },
});

