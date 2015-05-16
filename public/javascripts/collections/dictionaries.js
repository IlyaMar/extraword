var app = app || {};

(function () {
  'use strict';

  var DictList = Backbone.Collection.extend({
    model: app.Dictionary,
	url: 'dictionaries',
    
  });
  // Create our global collection of dictionaries
  app.dict_list = new DictList();
  
})();