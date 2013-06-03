Ext.define('TouchMill.model.SpiritScore', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'score_id', 'game_id', 'team_1_score', 'team_2_score', 'team_1_comment', 'team_2_comment', 'team_1_id', 'team_2_id',
            // added, not in DB
            // computational, is just string split/join; the scores above are the combined string value
            'team_1_rules_score', 'team_2_rules_score',
            'team_1_fouls_score', 'team_2_fouls_score',
            'team_1_fairness_score', 'team_2_fairness_score',
            'team_1_attitude_score', 'team_2_attitude_score',
            'team_1_compare_score', 'team_2_compare_score',
            // used for marking and shortcutting.  may be totally unnecessary.
            'is_mine',
        ],

        proxy: {
            type: 'configurableRest',
            url: 'game_sportsmanship_scores/',
            extraParams: { limit: 1, order_by: '[-time_last_updated]' },
            reader: { type: 'json', rootProperty: 'objects', },
        },
    },
});

