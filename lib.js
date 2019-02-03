var get = ( selector ) => { 
    
    if( ! ( typeof selector === 'string' || selector instanceof String ) ){
        return;
    }

    if( selector[0] === '#' ){
        return document.querySelector( selector );
    }

    return Array.from( document.querySelectorAll( selector ) );
}

var remove = ( target ) => {
    var el = get( target );
    Array.isArray( el ) ? el.map( i => i.remove() ) : el.remove();
}

var createEl = ( tagName, props ) => 
{
    var newEl = document.createElement( tagName );

    for( var key in props ){
        if( key == 'text' ){
            newEl.innerText = props[key];
            continue;
        }
        
        newEl.setAttribute( key, props[key] )
    }

    return newEl;
}

var append = ( target, tagName, props ) => {
    
    var el = ( target instanceof Node || target instanceof HTMLElement ) ? target 
                                                                         : get( target );

    Array.isArray( el ) ? el.map( i =>  append( i, tagName, props ) )
                        : el.appendChild( createEl( tagName, props ) );
}

var modify = ( target, props ) => {
    var el = get( target );

    for( var key in props ){
        if( key == 'text' ){
            el.innerText = props[key];
            continue;
        }
        
        el.setAttribute( key, props[key] )
    }
}

