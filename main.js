
$( 'body' ).create( 'h1', { id : 'currYear' } );

new Calendar( 2065, 5, '#main-container' );

currentDate = new Date();
currYear    = currentDate.getFullYear();
currMonth   = currentDate.getMonth();


$( '.jora' ).children();

recreateCalendar = ( year, month ) => {

    if( month < 0 )
    {
        currMonth = 11
        currYear--;
    }

    if( month > 11 )
    {
        currMonth = 0;
        currYear++;
    }

    $( '#currYear' ).modify( { innerHTML : currYear } );

    $( '#main-container' ).children().remove();
    new Calendar( currYear, currMonth, '#main-container' );
}

$( 'body' ).create( 'input', { type : 'button', value : 'Previous month' } )
            .setEventHandler( {onclick : () => { recreateCalendar( currYear, --currMonth ) } } );
$( 'body' ).create( 'input', { type : 'button', value : 'Next month' } )
            .setEventHandler( {onclick : () => { recreateCalendar( currYear, ++currMonth ) } } );
$( 'body' ).create( 'input', { type : 'button', value : 'Previous year' } )
            .setEventHandler( {onclick : () => { recreateCalendar( --currYear, currMonth ) } } );
$( 'body' ).create( 'input', { type : 'button', value : 'Next year' } )
            .setEventHandler( {onclick : () => { recreateCalendar( ++currYear, currMonth ) } } );