var actionButton, actionButtonDisabled,
    toolFactory = new OO.ui.ToolFactory(),
    toolGroupFactory = new OO.ui.ToolGroupFactory(),
    toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory, { actions: true } );
    rightBar = new OO.ui.Toolbar( toolFactory, toolGroupFactory );

function helpMenu( toolGroup, config ) {
    OO.ui.PopupTool.call( this, toolGroup, $.extend( { popup: {
        padded: true,
        label: 'Help',
        head: true
    } }, config ) );
    this.popup.$body.append( '<a href="http://performance.wmflabs.org/wiki/Main_Page" target="_blank">Performance Dev Website</a><br><br>' );
}
OO.inheritClass( helpMenu, OO.ui.PopupTool );
helpMenu.static.name = 'help';
helpMenu.static.icon = 'help';
helpMenu.static.title = 'Help';
toolFactory.register( helpMenu );

rightBar.setup( [
    {
        type: 'bar',
        include: [ 'help' ]
    },
] );

toolFactory.register( helpMenu );

actionButton = new OO.ui.ButtonWidget( { label: 'Action', flags: [ 'primary', 'progressive' ] } );
actionButtonDisabled = new OO.ui.ButtonWidget( { label: 'Disabled', disabled: true } );
toolbar.$actions
    .append(
		  	$( '<div>' )
		  	    .addClass( 'rightBar' )
				    .append( rightBar.$element ),
		  	$( '<div>' )
		  	    .addClass( 'actionButtons' )
				    .append( actionButton.$element, actionButtonDisabled.$element )
);
rightBar.emit( 'updateState' );

$( document.body ).append( toolbar.$element );
rightBar.initialize();
toolbar.initialize();
toolbar.emit( 'updateState' );