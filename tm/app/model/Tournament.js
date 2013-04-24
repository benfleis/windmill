Ext.define('TouchMill.model.Tournament', {
  extend: 'Ext.data.Model',

  config: {
    fields: [
      { name: 'name', },
      { name: 'season_id', },
      { name: 'leaguevine_url', },
      { name: 'visibility', },
      { name: 'id', },
    ],
  },
});

