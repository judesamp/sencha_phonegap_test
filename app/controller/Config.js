Ext.define('shaglamMobileClient.utils.Config', {    
   singleton : true,
    config : {
            CurrentUser: 'Placeholder',
            CsrfTag: 'tag'
    },
    constructor: function (config) {
        this.initConfig(config);
    }
})