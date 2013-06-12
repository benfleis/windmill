Ext.define('TouchMill.view.standing.StandingList', {
    extend: 'Ext.List',
    xtype: 'standingStandingList',

    config: {
        title: 'Swiss Standings',
        store: 'SwissStandings',
        itemTpl: '#{ranking}: {team_short_name} <small class="muted">({wins}-{losses}; {swiss_score})</small>',
    },
});
