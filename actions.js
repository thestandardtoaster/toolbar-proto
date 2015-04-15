var name, title, type;
if ( !(type === 'constructive' || type === 'destructive' || type === 'progressive') ) {
    type = null;
}

function createAction( name, title, type ) {
    var newAction = new OO.ui.ButtonWidget( {
        name: name,
        label: title,
        flags: [ type ],
        //framed: false,
    } );
    toolbar.addItems( [ newAction ] );
    toolbar.emit( 'updateState' );
}

createAction( 'test1', 'Test #1', 'constructive' );
createAction( 'test2', 'Test #2', 'destructive' );
createAction( 'test3', 'Test #3', 'progressive' );