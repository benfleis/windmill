Ext.define('TouchMill.model.Team', {
  extend: 'Ext.data.Model',

  config: {
    fields: [
      { name: 'player_id', },
      { name: 'team_id', },
      { name: 'number', },
    ],
  },
});
