(function() {

function spiritFormItems(teamFieldNum, teamName) {
    // only non hidden starter button, to expand the rest
    var items = [
        {
            xtype: 'button', id: 'gameSpirit' + teamFieldNum + 'Update', ui: 'action',
            text: '<em>Rate</em> ' + teamName + ' <em>for Spirit</em>',
            handler: function(btn) {
                Ext.getCmp('gameDetails')['showEditSpirit' + teamFieldNum](); }
        }
    ];

    // all the rule variants
    var i = 0;
    var id = function() { return 'gameSpirit' + teamFieldNum + 'Field' + i++; };
    var basis = [
        { id: id(), hidden: true, label: 'Rules & Use',         name: 'rules_score_team_' + teamFieldNum },
        { id: id(), hidden: true, label: 'Fouls & Contact',     name: 'fouls_score_team_' + teamFieldNum },
        { id: id(), hidden: true, label: 'Fair-Mindedness',     name: 'fairness_score_team_' + teamFieldNum },
        { id: id(), hidden: true, label: 'Attitude & Control',  name: 'attitude_score_team_' + teamFieldNum },
        { id: id(), hidden: true, label: 'Opponent Spirit',     name: 'compare_score_team_' + teamFieldNum },
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
        return _.extend({ xtype: 'selectfield', options: opts }, x);
    }));

    // then add the submit button and return
    return items.concat([
        {
            xtype: 'button', id: id(), hidden: true,
            text: 'Cancel', ui: 'decline',
            handler: function(btn) { Ext.getCmp('gameDetails')['hideEditSpirit' + teamFieldNum](); },
        },
        {
            xtype: 'button', id: id(), hidden: true,
            text: 'Submit Spirit', ui: 'confirm',
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
        this.showDisplayScore();
    },

    config: {
        title: 'Game Details',
        id: 'gameDetails',
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
                    },
                    {
                        xtype: 'button',
                        id: 'gameScoreEditButton',
                        text: 'Edit Game Scores',
                        ui: 'confirm',
                        handler: function(btn) {
                            Ext.getCmp('gameDetails').showEditScore();
                        },
                    },
                    {
                        xtype: 'button',
                        id: 'gameScoreCancelButton',
                        text: 'Cancel',
                        ui: 'decline',
                        handler: function(btn) {
                            var gameDetails = Ext.getCmp('gameDetails');
                            gameDetails.resetForm();
                            gameDetails.showDisplayScore();
                        },
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
        Ext.getCmp('gameScoreEditButton').set('disabled', !loggedIn);

        // setup spirit score labels; if team_perspective_id is set on 'this',
        // then we only display the ability to submit a score for the other
        // team.
        console.log('game.Details'); console.log(this);
        var item = Ext.getCmp('spiritScoreTeam1Form');
        if (game.team_perspective_id !== game.get('team_1_id')) {
            item.setItems(spiritFormItems(1, game.get('team_1_name')));
            if (!loggedIn) {
                Ext.getCmp('gameSpirit1Update').set('disabled', true);
                Ext.getCmp('gameSpirit1Update').set('ui', undefined);
            }
            item.show();
        }

        item = Ext.getCmp('spiritScoreTeam2Form');
        if (game.team_perspective_id !== game.get('team_2_id')) {
            item.setItems(spiritFormItems(2, game.get('team_2_name')));
            if (!loggedIn) {
                Ext.getCmp('gameSpirit2Update').set('disabled', true);
                Ext.getCmp('gameSpirit2Update').set('ui', undefined);
            }
            item.show();
        }
    },

    resetForm: function() {
        this.setValues(this.getRecord().getData());
    },

    // ------------------------------------------------------------------------

    showDisplayScore: function() {
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

    // ------------------------------------------------------------------------

    hideEditSpirit1: function() {
        console.log('showDisplaySpirit1');
        showIds('gameSpirit1Update');
        hideIds('gameSpirit1Field0', 'gameSpirit1Field1', 'gameSpirit1Field2',
            'gameSpirit1Field3', 'gameSpirit1Field4', 'gameSpirit1Field5',
            'gameSpirit1Field6');
    },

    showEditSpirit1: function() {
        console.log('showEditSpirit1');
        hideIds('gameSpirit1Update');
        showIds('gameSpirit1Field0', 'gameSpirit1Field1', 'gameSpirit1Field2',
            'gameSpirit1Field3', 'gameSpirit1Field4', 'gameSpirit1Field5',
            'gameSpirit1Field6');
    },

    getGameSpirit1Values: function() {
        var vals = this.getValues();
        return {
            game_id:                this.getRecord().get('id'),
            team_1_score:           null,
            team_1_rules_score:     vals.rules_score_team_1,
            team_1_fouls_score:     vals.fouls_score_team_1,
            team_1_fairness_score:  vals.fairness_score_team_1,
            team_1_attitude_score:  vals.attitude_score_team_1,
            team_1_compare_score:   vals.compare_score_team_1,
            team_1_comment:         vals.comment_team_1,
        };
    },

    hideEditSpirit2: function() {
        console.log('showDisplaySpirit2');
        showIds('gameSpirit2Update');
        hideIds('gameSpirit2Field0', 'gameSpirit2Field1', 'gameSpirit2Field2',
            'gameSpirit2Field3', 'gameSpirit2Field4', 'gameSpirit2Field5',
            'gameSpirit2Field6');
    },

    showEditSpirit2: function() {
        console.log('showEditSpirit2');
        hideIds('gameSpirit2Update');
        showIds('gameSpirit2Field0', 'gameSpirit2Field1', 'gameSpirit2Field2',
            'gameSpirit2Field3', 'gameSpirit2Field4', 'gameSpirit2Field5',
            'gameSpirit2Field6');
    },

    getGameSpirit2Values: function() {
        var vals = this.getValues();
        return {
            game_id:                this.getRecord().get('id'),
            team_2_score:           null,
            team_2_rules_score:     vals.rules_score_team_2,
            team_2_fouls_score:     vals.fouls_score_team_2,
            team_2_fairness_score:  vals.fairness_score_team_2,
            team_2_attitude_score:  vals.attitude_score_team_2,
            team_2_compare_score:   vals.compare_score_team_2,
            team_2_comment:         vals.comment_team_2,
        };
    },

});

})();
