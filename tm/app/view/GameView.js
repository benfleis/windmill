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
                    { text: 'Report Game Spirit', action: 'addScore',
                        handler: function() { Ext.getCmp('gameview').showAddScore(); }
                    },
                    { text: 'Report Spirit Score', action: 'addSpirit' },
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
                //tplWriteMode: 'append',
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
                        action: 'cancelScore',
                    },
                    {
                        xtype: 'button',
                        text: 'Submit Game Score',
                        action: 'submitScore',
                    },
                ],
            },
        ],
    },

    showAddScore: function() {
        Ext.getCmp('scoreLast').hide();
        Ext.getCmp('scoreForm').show();
        //var items = this.getItems();
        //items.getAt(2).hide();
        //items.getAt(3).show();
    },

    hideAddScore: function() {
        Ext.getCmp('scoreLast').show();
        Ext.getCmp('scoreForm').hide();
        //var items = this.getItems();
        //items.getAt(2).show();
        //items.getAt(3).hide();
    },
});
