var actionButton, actionButtonDisabled,
  toolFactory = new OO.ui.ToolFactory(),
	toolGroupFactory = new OO.ui.ToolGroupFactory(),
	toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory, { actions: true } );


function createTool( toolbar, group, name, icon, title, init, onSelect ) {
	var Tool = function () {
		Tool.super.apply( this, arguments );
		this.toggled = false;
		if ( init ) {
			init.call( this );
		}
	};

	OO.inheritClass( Tool, OO.ui.Tool );

	Tool.prototype.onSelect = function () {
		if ( onSelect ) {
			onSelect.call( this );
		} else {
			this.toggled = !this.toggled;
			this.setActive( this.toggled );
		}
		toolbar.emit( 'updateState' );
	};
	Tool.prototype.onUpdateState = function () {};

	Tool.static.name = name;
	Tool.static.group = group;
	Tool.static.icon = icon;
	Tool.static.title = title;
	return Tool;
}


toolbar.setup( [
	{
		type: 'bar',
		include: [ { group: 'barTools' } ]
	},
	{
		type: 'list',
		indicator: 'down',
		label: 'List',
		icon: 'picture',
		include: [ { group: 'listTools' } ],
		allowCollapse: [ 'listTool4', 'listTool5', 'listTool6' ]
	},
	{
		type: 'list',
		indicator: 'down',
		label: 'Auto-disabling list',
		icon: 'picture',
		include: [ { group: 'autoDisableListTools' } ]
	},
	{
		type: 'menu',
		indicator: 'down',
		icon: 'alert',
		include: [ { group: 'menuTools' } ]
	},
	{
		type: 'list',
		icon: 'picture',
		include: [ { group: 'listTools' } ]
	},
	{
    label: 'Catch-all',
		include: '*'
		}
] );

actionButton = new OO.ui.ButtonWidget( { label: 'Action', flags: [ 'primary', 'progressive' ] } );
actionButtonDisabled = new OO.ui.ButtonWidget( { label: 'Disabled', disabled: true } );
toolbar.$actions.append( actionButton.$element, actionButtonDisabled.$element );

toolbar.emit( 'updateState' );

toolFactory.register( createTool( toolbar, 'barTools', 'barTool', 'picture', 'This is a test tool' ) );
toolFactory.register( createTool( toolbar, 'barTools', 'disabledBarTool', 'picture', 'Basic tool in bar disabled', function () { this.setDisabled( true ); } ) );
toolFactory.register( createTool( toolbar, 'listTools', 'listTool', 'picture', 'First basic tool in list' ) );
toolFactory.register( createTool( toolbar, 'listTools', 'listTool1', 'picture', 'Basic tool in list' ) );
toolFactory.register( createTool( toolbar, 'listTools', 'listTool2', 'picture', 'Another basic tool' ) );
toolFactory.register( createTool( toolbar, 'listTools', 'listTool3', 'picture', 'Basic disabled tool in list', function () { this.setDisabled( true ); } ) );
toolFactory.register( createTool( toolbar, 'listTools', 'listTool4', 'picture', 'More basic tools' ) );
toolFactory.register( createTool( toolbar, 'listTools', 'listTool5', 'picture', 'And even more' ) );
toolFactory.register( createTool( toolbar, 'listTools', 'listTool6', 'picture', 'A final tool' ) );

toolFactory.register( createTool( toolbar, 'autoDisableListTools', 'autoDisableListTool', 'picture', 'Click to disable this tool', null, function () { this.setDisabled( true ); } ) );

toolFactory.register( createTool( toolbar, 'menuTools', 'menuTool', 'check', 'Menu tool' ) );
toolFactory.register( createTool( toolbar, 'menuTools', 'menuTool2', 'tag', 'Another menu tool' ) );

toolFactory.register( createTool( toolbar, 'unusedStuff', 'unusedTool', 'help', 'This tool is not explicitly used anywhere' ) );
toolFactory.register( createTool( toolbar, 'unusedStuff', 'unusedTool1', 'help', 'And neither is this one' ) );
/*
var tool = new OO.ui.Tool( 'barTools', {
  name: 'barTool',
  icon: 'picture',
  title: 'This is a test tool'
} ); */

$( document.body ).append( toolbar.$element );