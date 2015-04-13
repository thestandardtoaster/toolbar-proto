var actionButton, actionButtonDisabled,
    toolFactory = new OO.ui.ToolFactory(),
    toolGroupFactory = new OO.ui.ToolGroupFactory(),
    toolbar = new OO.ui.Toolbar( toolFactory, toolGroupFactory, { actions: true } );
    // Right toolbar to be added to the right side of the main toolbar
    rightBar = new OO.ui.Toolbar( toolFactory, toolGroupFactory );
    // Content area text
    $content = $( '<p>' ).addClass( 'content' ).text( 'This is where the content will go. So exciting!' );

function helpMenu( toolGroup, config ) {
    OO.ui.PopupTool.call( this, toolGroup, $.extend( { popup: {
        padded: true,
        label: 'Help',
        head: true
    } }, config ) );
    this.popup.$body.append( '<a href="http://performance.wmflabs.org/wiki/Main_Page" target="_blank">Performance Dev Website</a><br/><br/>' );
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

var frame = new OO.ui.PanelLayout( {
    expanded: false,
    framed: true
} );
var contentFrame = new OO.ui.PanelLayout( {
    expanded: false,
    padded: true
} );
frame.$element.append(
    toolbar.$element,
    contentFrame.$element.append( $content )
);

$( document.body ).append( frame.$element );
rightBar.initialize();
rightBar.emit( 'updateState' );
toolbar.initialize();
toolbar.emit( 'updateState' );