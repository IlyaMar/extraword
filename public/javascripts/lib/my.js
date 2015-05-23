
// unused
function update_model(collection, model, params) {
	// Then I will update the attributes on this particular model:
	model.set(params)

	// Then I will save it to the server:
	model.save({}, {url: collection.url + '/' +model.get('id')})

	//Then we have to update collection accordingly to the changes:
	collection.set({model},{remove: false})
}