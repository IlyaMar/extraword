var app = app || {};

(function () {
  'use strict';

  // Word collection
  var DictList = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: app.Dictionary,
	url: 'dictionaries',
    
  });
  // Create our global collection of words.
  app.dict_list = new DictList();
  
})();