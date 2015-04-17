var name, title, type;
if (!(type === 'constructive' || type === 'destructive' || type === 'progressive')) {
    type = null;
}

function ActionManager(t){
	this.toolbar = t;
	this.actions = [];
	
	this.updateActions = function(){
		this.toolbar.items = [];
		this.toolbar.addItems(this.actions);
		this.toolbar.emit('updateState');
	}

	this.createAction = function (name, label, type){
		var newAction = new OO.ui.ButtonWidget({
			name: name,
			label: label,
			flags: [type],
			// framed: false
		});
		this.actions.push(newAction);
		this.updateActions();
		return this.actions.length-1;
	}
	
	this.changeAction = function(handle, name, label, type){
		console.log("Retrieved Action");
		console.dir(this.actions[handle]);
		if(name != ""){
			this.actions[handle].name = name;
		}
		if(label != ""){
			this.actions[handle].label = label;
		}
		if(type != ""){
			this.actions[handle].type = type;
		}
		this.updateActions();
	}
}

var am = new ActionManager(toolbar);
var test1 = am.createAction('test1', 'Test #1', 'constructive');
var test2 = am.createAction('test2', 'Test #2', 'destructive');
var test3 = am.createAction('test3', 'Test #3', 'progressive');
