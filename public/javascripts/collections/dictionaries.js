'use strict';

var app = app || {};

(function () {

  var DictList = Backbone.Collection.extend({
    model: app.Dictionary,
	url: 'dictionaries',
    
  });
  // global collection of dictionaries
  app.dict_list = new DictList();
  app.dict_list.fetch();			

})();