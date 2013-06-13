Ext.define('TouchMill.view.Events', {
    extend: 'Ext.Container',
    
    layout: {
      type: 'vbox',
      align: "start",
      pack: "start",
    },
    
    items: [
        {
                docked: 'top',
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'container',
                        html: 'Align: ',
                        style: 'color: #fff; padding: 0 10px; width: 85px;'
                    },
                    {
                        xtype: 'segmentedbutton',
                        allowDepress: false,
                        items: [
                            { text: 'Thu',   handler: function() { console.log("thu"); }, pressed: true },
                            { text: 'Fri',  handler: function() { console.log("fri"); } },
                            { text: 'Sat',     handler: function() { console.log("sat"); } },
                            { text: 'Sun', handler: function() { console.log("sun"); } }
                        ]
                    }
                ]
            },
    
    ],
    
    xtype: 'events',
    html: 'panel test html',
    
    config: {
        iconCls: 'calendar',
        title: 'Events',
    },
  });

  Ext.create("TouchMill.view.Events");