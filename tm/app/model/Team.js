Ext.define('TouchMill.model.Team', {
  extend: 'Ext.data.Model',

  config: {
    fields: [
      { name: 'team_id', },
      { name: 'name', },
      { name: 'season_id', },
      { name: 'short_name', },
      { name: 'city', },
      { name: 'country', },
    ],
  },
});
