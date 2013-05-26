Ext.define('TouchMill.data.proxy.ConfigurableRest', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.configurableRest',

    constructor: function(config) {
        console.log('ConfigurableRest.constructor(...)');
        // XXX walk the model and build a list of fields that we want, so that
        // later GETs will be much more efficient
        this.callParent([config]);
    },

    config: {
        useStaticUrls: false,
    },

    buildUrl: function(request) {
        // build URL, respecting static url flags; to use a static URL, both
        // Config.active && this.config.useStaticUrls must be true.
        // if using static URL, convert trailing '/' -> '.json'
        var url = Config.active.useStaticUrls && this.getUseStaticUrls()
            ? Config.active.staticUrlBase + (request.getUrl() || this.getUrl()).replace(/\/$/g, '.json')
            : Config.active.apiUrlBase + (request.getUrl() || this.getUrl());
        request.setUrl(url);

        // NOTE: handle Config.active.apiParams / request.getParams -
        // request.getParams already has limit, page and start set; we only
        // care about limit, but want it from apiParams.  for now, just set it
        // to 200, all the time.  may have to handle this more gracefully,
        // later on.
        var reqParams = request.getParams();
        if (Config.active.apiParams.limit !== undefined)
            reqParams.limit = Config.active.apiParams.limit;

        // walk params -- if an array is in there, convert to [x,y,z] string form
        var params = _.assign({}, Config.active.apiParams, reqParams, function(obj, src) {
            var rv = (src === undefined) ? obj : src;
            return Array.isArray(rv) ? ('[' + rv.join(',') + ']') : rv;
        });
        request.setParams(params);

        return this.callParent([request]);
    },
});
