
daysLabels = [
    'Mon', 
    'Tue', 
    'Wed', 
    'Thu', 
    'Fri', 
    'Sat', 
    'Sun'
];

months = [
    'January',  
    'February', 
    'March',    
    'April',    
    'May',      
    'June',     
    'July',     
    'August',   
    'September',
    'October',  
    'November', 
    'December' 
];

daysInMonth = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
];

// this is the current date
cal_current_date = new Date();

function Calendar( year, month, parent ) {
    this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
    this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
    this.generate( parent );
}

Calendar.prototype.generate = function ( parent ) {

    // get first day of month
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();

    // find number of days in month
    var monthLength = daysInMonth[this.month];

    // compensate for leap year
    if (this.month == 1) { // February only!
        if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
            monthLength = 29;
        }
    }

    //header
    var monthName = months[this.month]
    $( parent ).create( 'table', { id: 'calendar-table' } )
               .create( 'tr' )
               .create( 'th', { colspan : '7', innerHTML : monthName + '&nbsp;' } );

    var daysHeader = $( '#calendar-table' ).create( 'tr', { id : "days-header" } );
    
    for (var i = 0; i <= 6; i++) {
        daysHeader.append( 'td', { innerText : daysLabels[i] } );
    }
    // days
    var day = 1;
    // this loop is for is weeks (rows)
    for (var i = 0; i < 7; i++) {
        var row = $( '#calendar-table' ).create( 'tr', { class : 'daysRow' } );
        
        for (var j = 1; j <= 7; j++) {
            var bool = ( day <= monthLength ) && ( i > 0 || j >= startingDay );
            row.append( 'td', { class : "calendar-day", innerHTML : ( bool ? day++ : '&nbsp;' ) } );
        }

        if (day > monthLength) {
            break;
        }
    }
}

