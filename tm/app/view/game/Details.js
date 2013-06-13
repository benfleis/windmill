(function() {

function spiritFormItems(teamFieldNum, teamName) {
    // only non hidden starter button, to expand the rest
    var items = [];

    // all the rule variants
    var i = 0;
    var id = function() { return 'gameSpirit' + teamFieldNum + 'Field' + i++; };
    var basis = [
        { id: id(), label: 'Rules & Use',         name: 'rules_score_team_' + teamFieldNum },
        { id: id(), label: 'Fouls & Contact',     name: 'fouls_score_team_' + teamFieldNum },
        { id: id(), label: 'Fair-Mindedness',     name: 'fairness_score_team_' + teamFieldNum },
        { id: id(), label: 'Attitude & Control',  name: 'attitude_score_team_' + teamFieldNum },
        { id: id(), label: 'Opponent Spirit',     name: 'compare_score_team_' + teamFieldNum },
    ];
    // and each has 6 options
    var opts = [
        { text: 'Unset',                value: null },
        { text: '0 - Poor',             value: 0 },
        { text: '1 - Not Good',         value: 1 },
        { text: '2 - Good',             value: 2 },
        { text: '3 - Very Good',        value: 3 },
        { text: '4 - Excellent',        value: 4 },
    ];

    // combine and concat
    items = items.concat(_.map(basis, function(x) {
        return _.extend({ xtype: 'selectfield', options: opts, initialize: function() { this.setValue(null); } }, x);
    }));

    // then add the submit button and return
    return items.concat([
        {
            xtype: 'button', id: id(),
            text: 'Submit Spirit Scores', ui: 'confirm',
            action: 'submitSpirit' + teamFieldNum,
        },
    ]);
}

function hideIds() { _.each(arguments, function(id) { Ext.getCmp(id).hide(); }); };
function showIds() { _.each(arguments, function(id) { Ext.getCmp(id).show(); }); };
function disableIds() { _.each(arguments, function(id) { Ext.getCmp(id).set('disabled', true); }); };
function enableIds() { _.each(arguments, function(id) { Ext.getCmp(id).set('disabled', false); }); };

Ext.define('TouchMill.view.game.Details', {
    extend: 'Ext.form.Panel',
    xtype: 'gameDetails',
    requires: [ 'Ext.form.FieldSet' ],

    // REQUIRES that Game.stitchAssociations() has already run.
    initialize: function() {
        this.setupForm();
    },

    config: {
        title: 'Game Details',
        id: 'gameDetails',
        items: [
            {
                xtype: 'fieldset',
                id: 'gameScoreForm',
                defaults: { labelWidth: '70%' },
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
                    },
                    {
                        xtype: 'button',
                        id: 'gameScoreSaveButton',
                        text: 'Save Game Scores',
                        ui: 'confirm',
                        action: 'submitScore',
                    },
                ],
            },

            {
                xtype: 'fieldset',
                id: 'spiritScoreTeam1Form',
                defaults: { labelWidth: '60%' },
                hidden: true,
                items: null,    // filled in @ setupForm()
            },

            {
                xtype: 'fieldset',
                id: 'spiritScoreTeam2Form',
                defaults: { labelWidth: '60%' },
                hidden: true,
                items: null,    // filled in @ setupForm()
            },

        ],
    },

    // ------------------------------------------------------------------------

    setupForm: function() {
        var game = this.getRecord();
        var loggedIn = Config.sessionIsLoggedIn();

        // set name labels in score bits
        Ext.getCmp('gameScoreTeam1').setLabel(game.get('team_1_name'));
        Ext.getCmp('gameScoreTeam2').setLabel(game.get('team_2_name'));
        Ext.getCmp('gameScoreIsFinal').setValue(true);
        Ext.getCmp('gameScoreIsFinal').setChecked(true);

        // setup spirit score labels; if team_perspective_id is set on 'this',
        // then only display the ability to submit a score for the other team.
        console.log('game.Details'); console.log(this);
        var item = Ext.getCmp('spiritScoreTeam1Form');
        if (game.get('team_perspective_id') !== game.get('team_1_id')) {
            item.setItems(spiritFormItems(1, game.get('team_1_name')));
            item.show();
        }

        item = Ext.getCmp('spiritScoreTeam2Form');
        if (game.get('team_perspective_id') !== game.get('team_2_id')) {
            item.setItems(spiritFormItems(2, game.get('team_2_name')));
            item.show();
        }
    },

    resetForm: function() {
        this.setValues(this.getRecord().getData());
    },

    // ------------------------------------------------------------------------

    getGameScoreValues: function() {
        var vals = this.getValues();
        return {
            game_id: this.getRecord().get('id'),
            team_1_score: vals.game_score_team_1,
            team_2_score: vals.game_score_team_2,
            is_final: vals.game_score_is_final,
        };
    },

    // ------------------------------------------------------------------------

    getGameSpirit1Values: function() {
        var vals = this.getValues();
        return {
            game_id:                this.getRecord().get('id'),
            team_1_score:           null,
            team_1_rules_score:     parseInt(vals.rules_score_team_1),
            team_1_fouls_score:     parseInt(vals.fouls_score_team_1),
            team_1_fairness_score:  parseInt(vals.fairness_score_team_1),
            team_1_attitude_score:  parseInt(vals.attitude_score_team_1),
            team_1_compare_score:   parseInt(vals.compare_score_team_1),
            team_1_comment:         vals.comment_team_1,
        };
    },

    getGameSpirit2Values: function() {
        var vals = this.getValues();
        return {
            game_id:                this.getRecord().get('id'),
            team_2_score:           null,
            team_2_rules_score:     parseInt(vals.rules_score_team_2),
            team_2_fouls_score:     parseInt(vals.fouls_score_team_2),
            team_2_fairness_score:  parseInt(vals.fairness_score_team_2),
            team_2_attitude_score:  parseInt(vals.attitude_score_team_2),
            team_2_compare_score:   parseInt(vals.compare_score_team_2),
            team_2_comment:         vals.comment_team_2,
        };
    },

});

})();
