(function() {

function spiritFormItems(team) {
    var basis = [
        { label: 'Rules & Use',         name: 'team_' + team + '_rules_score', },
        { label: 'Fouls & Contact',     name: 'team_' + team + '_fouls_score', },
        { label: 'Fair-Mindedness',     name: 'team_' + team + '_fairness_score', },
        { label: 'Attitude & Control',  name: 'team_' + team + '_attitude_score', },
        { label: 'Opponent Spirit',     name: 'team_' + team + '_compare_score', },
    ];
    var spiritSelectOpts = [
        { text: 'X - Unset',            value: 'X' },
        { text: '0 - Poor',             value: 0 },
        { text: '1 - Not Good',         value: 1 },
        { text: '2 - Good',             value: 2 },
        { text: '3 - Very Good',        value: 3 },
        { text: '4 - Excellent',        value: 4 },
    ];

    var scores = _.map(basis, function(x) {
        return _.extend({ xtype: 'selectfield', options: spiritSelectOpts }, x);
    });
    return scores.concat([
        {
            xtype: 'button', text: 'Cancel', ui: 'decline',
            handler: function(btn) { Ext.getCmp('gameSummary')['hideAddSpiritTeam' + team](); },
        },
        { xtype: 'button', text: 'Submit Game Score', ui: 'confirm', action: 'submitSpiritTeam' + team, },
    ]);
}

function hideIds() { _.each(arguments, function(id) { Ext.getCmp(id).hide(); }); };
function showIds() { _.each(arguments, function(id) { Ext.getCmp(id).show(); }); };
function disableIds() { _.each(arguments, function(id) { Ext.getCmp(id).set('disabled', true); }); };
function enableIds() { _.each(arguments, function(id) { Ext.getCmp(id).set('disabled', false); }); };

Ext.define('TouchMill.view.GameView', {
    extend: 'Ext.form.Panel',
    xtype: 'gameView',

    requires: [ 'Ext.form.FieldSet' ],

    initialize: function() {
        this.setupForm();
        this.showViewScore();
    },

    config: {
        title: 'Game Summary',
        id: 'gameSummary',
        items: [
            {
                xtype: 'panel',
                id: 'gameHeader',
                tpl: '{team_1_short_name} vs. {team_2_short_name}',
            },

            {
                xtype: 'panel',
                id: 'gameScoreView',
                tpl: [
                    '<p>Is Final: {game_score_is_final}</p>',
                    '<p>Game - {game_score_team_1} / {game_score_team_2}</p>',
                    '<p>Spirit Score - {spirit_score_team_1} / {spirit_score_team_2}</p>',
                ],
            },

            {
                xtype: 'fieldset',
                id: 'gameScoreForm',
                hidden: false,
                defaults: { labelWidth: '80%' },
                items: [
                    {
                        xtype: 'numberfield',
                        id: 'gameScoreTeam1',
                        label: '[Team 1 Score]',
                        name: 'game_score_team_1',
                    },
                    {
                        xtype: 'numberfield',
                        id: 'gameScoreTeam2',
                        label: '[Team 2 Score]',
                        name: 'game_score_team_2',
                    },
                    {
                        xtype: 'checkboxfield',
                        id: 'gameScoreIsFinal',
                        label: 'Final Score?',
                        name: 'game_score_is_final',
                        //checked: true,
                    },
                    {
                        xtype: 'button',
                        id: 'gameScoreEditButton',
                        text: 'Edit',
                        ui: 'confirm',
                        handler: function(btn) {
                            Ext.getCmp('gameSummary').showEditScore();
                        },
                    },
                    {
                        xtype: 'button',
                        id: 'gameScoreCancelButton',
                        text: 'Cancel',
                        ui: 'decline',
                        handler: function(btn) {
                            var gameSummary = Ext.getCmp('gameSummary');
                            gameSummary.resetForm();
                            gameSummary.showViewScore();
                        },
                    },
                    {
                        xtype: 'button',
                        id: 'gameScoreSaveButton',
                        text: 'Save',
                        ui: 'confirm',
                        action: 'submitScore',
                    },
                ],
            },

            {
                xtype: 'fieldset',
                id: 'spiritScoreTeam1Form',
                hidden: true,
                defaults: { labelWidth: '65%' },
                items: spiritFormItems(1),
            },

            {
                xtype: 'fieldset',
                id: 'spiritScoreTeam2Form',
                hidden: true,
                defaults: { labelWidth: '65%' },
                items: spiritFormItems(2),
            },

        ],
    },

    // REQUIRES that Game.stitchAssociations() already called.
    setupForm: function() {
        console.log('GameView.setupForm()');
        var game = this.getRecord();
        Ext.getCmp('gameScoreTeam1').setLabel(game.get('team_1_name'));
        Ext.getCmp('gameScoreTeam2').setLabel(game.get('team_2_name'));
        /*
        var spiritScore = Ext.create('TouchMill.model.SpiritScore', {
            game_id: game.get('id'),
            team_1_score: game.get('spirit_score_team_1'),
            team_2_score: game.get('spirit_score_team_2'),
            team_1_comment: game.get('spirit_comment_team_1'),
            team_2_comment: game.get('spirit_comment_team_2'),
        });
        if (Ext.getCmp('spiritScoreTeam1Form')) {
            Ext.getCmp('spiritScoreTeam1Form').setRecord(spiritScore);
        }
        if (Ext.getCmp('spiritScoreTeam2Form')) {
            Ext.getCmp('spiritScoreTeam2Form').setRecord(spiritScore);
        }
        */
    },

    resetForm: function() {
        this.setValues(this.getRecord().getData());
    },

    showViewScore: function() {
        disableIds('gameScoreTeam1', 'gameScoreTeam2', 'gameScoreIsFinal');
        showIds('gameScoreEditButton');
        hideIds('gameScoreCancelButton', 'gameScoreSaveButton');
    },

    showEditScore: function() {
        enableIds('gameScoreTeam1', 'gameScoreTeam2', 'gameScoreIsFinal');
        hideIds('gameScoreEditButton');
        showIds('gameScoreCancelButton', 'gameScoreSaveButton');
    },

    getGameScoreValues: function() {
        var vals = this.getValues();
        return {
            game_id: this.getRecord().get('id'),
            team_1_score: vals.game_score_team_1,
            team_2_score: vals.game_score_team_2,
            is_final: vals.game_score_is_final,
        };
    },

    /*
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

    */
});

})();
