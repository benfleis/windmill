(function() {

// is seems that these need to be defined externally -- tried defining them as
// member funcs, and using string ref, but that failed.
function _scoreDecoder1(idx) {
    return function(v, r) {
        var s = r.getData().team_1_score;
        return s ? JSON.parse(s)[idx] : v;
    };
}

function _scoreDecoder2(idx) {
    return function(v, r) {
        var s = r.getData().team_2_score;
        return s ? JSON.parse(s)[idx] : v;
    };
}

Ext.define('TouchMill.model.SpiritScore', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'score_id',                 type: 'int' },
            { name: 'game_id',                  type: 'int' },
            { name: 'team_1_score',             type: 'string' },
            { name: 'team_2_score',             type: 'string' },
            { name: 'team_1_comment',           type: 'string' },
            { name: 'team_2_comment',           type: 'string' },

            // added, not in DB
            // computational, is just string split/join; the scores above are the combined string value
            { name: 'team_1_rules_score',       type: 'int',        convert: _scoreDecoder1(0) },
            { name: 'team_1_fouls_score',       type: 'int',        convert: _scoreDecoder1(1) },
            { name: 'team_1_fairness_score',    type: 'int',        convert: _scoreDecoder1(2) },
            { name: 'team_1_attitude_score',    type: 'int',        convert: _scoreDecoder1(3) },
            { name: 'team_1_compare_score',     type: 'int',        convert: _scoreDecoder1(4) },
            { name: 'team_2_rules_score',       type: 'int',        convert: _scoreDecoder2(0) },
            { name: 'team_2_fouls_score',       type: 'int',        convert: _scoreDecoder2(1) },
            { name: 'team_2_fairness_score',    type: 'int',        convert: _scoreDecoder2(2) },
            { name: 'team_2_attitude_score',    type: 'int',        convert: _scoreDecoder2(3) },
            { name: 'team_2_compare_score',     type: 'int',        convert: _scoreDecoder2(4) },
        ],

        validations: [
            {
                type: 'format',
                field: 'team_1_score',
                matcher: /^$|([[]\d,\d,\d,\d,\d])/,
            },
        ],

        proxy: {
            type: 'configurableRest',
            url: 'game_sportsmanship_scores/',
            extraParams: { limit: 1, order_by: '[-time_last_updated]' },
            reader: { type: 'json', rootProperty: 'objects', },
        },
    },

    decodeScores: function() {
        var ss = JSON.parse(this.get('team_1_score'));
        this.set('team_1_rules_score', ss[0]);
        this.set('team_1_fouls_score', ss[1]);
        this.set('team_1_fairness_score', ss[2]);
        this.set('team_1_attitude_score', ss[3]);
        this.set('team_1_compare_score', ss[4]);
        ss = JSON.parse(this.get('team_2_score'));
        this.set('team_2_rules_score', ss[0]);
        this.set('team_2_fouls_score', ss[1]);
        this.set('team_2_fairness_score', ss[2]);
        this.set('team_2_attitude_score', ss[3]);
        this.set('team_2_compare_score', ss[4]);
    },

    encodeScores: function() {
        var team_1_score = null;
        if (!isNaN(parseInt(this.get('team_1_rules_score')))) {
            team_1_score = JSON.stringify([
                this.get('team_1_rules_score'),
                this.get('team_1_fouls_score'),
                this.get('team_1_fairness_score'),
                this.get('team_1_attitude_score'),
                this.get('team_1_compare_score'),
            ]);
        }
        this.set('team_1_score', team_1_score);

        var team_2_score = null;
        if (!isNaN(parseInt(this.get('team_2_rules_score')))) {
            team_2_score = JSON.stringify([
                this.get('team_2_rules_score'),
                this.get('team_2_fouls_score'),
                this.get('team_2_fairness_score'),
                this.get('team_2_attitude_score'),
                this.get('team_2_compare_score'),
            ]);
        }
        this.set('team_2_score', team_2_score);
    },
});

})();
