var _spiritSelectOpts = [
    { text: 'X - Unset',        value: -1 },
    { text: '0 - Poor',         value: 0 },
    { text: '1 - Not Good',     value: 1 },
    { text: '2 - Good',         value: 2 },
    { text: '3 - Very Good',    value: 3 },
    { text: '4 - Excellent',    value: 4 },
];

function _spiritFormItems(team) {
    var basis = [
        { label: 'Rules & Use', name: 'team_' + team + '_rules_score', },
        { label: 'Fouls & Contact', name: 'team_' + team + '_fouls_score', },
        { label: 'Fair-Mindedness', name: 'team_' + team + '_fairness_score', },
        { label: 'Attitude & Control', name: 'team_' + team + '_attitude_score', },
        { label: 'Opponent Spirit', name: 'team_' + team + '_compare_score', },
    ];
    var scores = _.map(basis, function(x) {
        return _.extend({ xtype: 'selectfield', options: _spiritSelectOpts }, x);
    });
    return scores.concat([
        {
            xtype: 'button', text: 'Cancel', ui: 'decline',
            handler: function(btn) { Ext.getCmp('gameview')['hideAddSpiritTeam' + team](); },
        },
        { xtype: 'button', text: 'Submit Game Score', ui: 'confirm', action: 'submitSpiritTeam' + team, },
    ]);
}

Ext.define('TouchMill.view.GameView', {
    //extend: 'Ext.Carousel',
    extend: 'Ext.form.Panel',
    xtype: 'gameView',
    requires: [ 'Ext.form.FieldSet' ],
    id: 'gameview',

    config: {
        title: 'Game Summary',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        text: 'Report Game Score',
                        action: 'addScore',
                        handler: function() { Ext.getCmp('gameview').showAddScore(); }
                    },
                    {
                        text: 'Report Spirit Score ABOUT Team 1',
                        action: 'addSpiritTeam1',
                        handler: function() { Ext.getCmp('gameview').showAddSpiritTeam1(); }
                    },
                    {
                        text: 'Report Spirit Score ABOUT Team 2',
                        action: 'addSpiritTeam2',
                        handler: function() { Ext.getCmp('gameview').showAddSpiritTeam2(); }
                    },
                ],
            },

            {
                xtype: 'panel',
                id: 'gameTeams',
                tpl: '<p>{team_1_id} vs. {team_2_id}</p>',
            },

            {
                xtype: 'panel',
                id: 'scoreLast',
                tpl: [
                    '<p>Is Final: {is_final}</p>',
                    '<tpl for="gameScores"><div>Game Score - {team_1_score} / {team_2_score}</div></tpl>',
                    '<tpl for="spiritScores"><div>Spirit Score - {team_1_score} / {team_2_score}</div></tpl>',
                    '{[console.log(values)]}',
                ].join(''),
            },

            {
                xtype: 'fieldset',
                id: 'scoreForm',
                hidden: true,                               // starts out hidden
                items: [
                    {
                        xtype: 'numberfield',
                        label: 'Team 1 Score',
                        name: 'team_1_score',
                        value: 0,
                        minValue: 0,
                        maxValue: 25,
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Team 2 Score',
                        name: 'team_2_score',
                        value: 0,
                        minValue: 0,
                        maxValue: 25,
                    },
                    {
                        xtype: 'checkboxfield',
                        label: 'Final Score?',
                        name: 'is_final',
                        checked: true,
                    },
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        ui: 'decline',
                        handler: function(btn) { Ext.getCmp('gameview').hideAddScore(); },
                    },
                    {
                        xtype: 'button',
                        text: 'Submit Game Score',
                        ui: 'confirm',
                        action: 'submitScore',
                    },
                ],
            },

            {
                xtype: 'fieldset',
                id: 'spiritFormTeam1',
                hidden: true,
                defaults: { labelWidth: '65%' },
                items: _spiritFormItems(1),
            },

            {
                xtype: 'fieldset',
                id: 'spiritFormTeam2',
                hidden: true,
                defaults: { labelWidth: '65%' },
                items: _spiritFormItems(2),
            },
        ],
    },

    showAddScore: function() {
        Ext.getCmp('scoreLast').hide();
        Ext.getCmp('scoreForm').show();
    },

    hideAddScore: function() {
        Ext.getCmp('scoreLast').show();
        Ext.getCmp('scoreForm').hide();
    },

    showAddSpiritTeam1: function() {
        Ext.getCmp('spiritFormTeam1').show();
    },

    hideAddSpiritTeam1: function() {
        Ext.getCmp('spiritFormTeam1').hide();
    },

    showAddSpiritTeam2: function() {
        Ext.getCmp('spiritFormTeam2').show();
    },

    hideAddSpiritTeam2: function() {
        Ext.getCmp('spiritFormTeam2').hide();
    },

});
