Ext.define('TouchMill.model.Game', {
  extend: 'Ext.data.Model',

  config: {
    fields: [
      { name: 'start_time', },
      { name: 'team_1_id', },
      { name: 'team_2_id', },
      { name: 'game_site_id', },
      { name: 'pool_round_id', },
    ],
  },
});


