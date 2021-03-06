'use strict';
var app = app || {};

(function () {

	app.ExerciseView = Backbone.View.extend({
		// generate a new element
		tagName: "div",
		id: "exercise-view",
		
	    template: _.template( $('#exercise-template').html() ),
	    templateComplete: _.template( $('#exercise-complete-template').html() ),

		wordIndex: 0,
		currentRight: 0,
		currentWrong: 0,
		
		events: {
		  'click .correct': 'correct',
		  'click .check': 'check',
		  'click .next': 'nextWord'
		},
		
		initialize: function() {
			console.log("ExerciseView initialize");
			this.wordIndex = 0;		// iterate words from start
			this.wordsAsked = 1;	// current exercise statistics
			this.wordsCorrect = 0;
			
			console.log(this.collection.size());
		},

		render: function() {
			if (this.wordIndex < this.collection.size()) {
				console.log("ExerciseView render 1");
				var word = this.collection.at(this.wordIndex);
				this.$el.html(this.template( {'forward' : word.get('forward'), 
											  'backward' : word.get('backward') })
											  );
				this.currentRight = word.get('correct');
				this.currentWrong = word.get('wrong');
			}
			else {
				console.log("ExerciseView render 2");
				this.$el.html(this.templateComplete({'dictionary': 'D1',
													 'asked': this.wordsAsked,
													 'correct': this.wordsCorrect} ));
			}
		    return this;
		},
		
		correct: function() {
			console.log("ExView correct");
			var word = this.collection.at(this.wordIndex);
			this.currentRight++;
			this.currentWrong--;
			this.wordsCorrect++;
			this.nextWord();
		},
		
		check: function() {
			console.log("ExView check");
			this.$('.hidden').removeClass('hidden');
		},
		
		nextWord: function() {
			console.log("ExView next");
			var word = this.collection.at(this.wordIndex);
			this.currentWrong++;
			word.save({correct : this.currentRight, wrong : this.currentWrong });
			this.wordsAsked++;
			this.wordIndex++;	// now iterating is linear, plans to make it random
			this.render();
		}
  });
	
})();	

