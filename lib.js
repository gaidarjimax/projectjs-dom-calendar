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

var createElement = ( tagName, props ) => 
{
    return setAttrsToElement( document.createElement( tagName ), props);
}

var appendToElement = ( target, tagName, props ) => {
    var el = ( target instanceof Node || target instanceof HTMLElement ) ? target 
                                                                         : get( target );

    if( tagName == undefined || tagName == null ){
        console.log( 'TagName invalid' );
        return;
    }

    Array.isArray( el ) ? el.map( i =>  appendToElement( i, tagName, props ) )
                        : el.appendChild( createElement( tagName, props ) );
}

var modify = ( target, props ) => {
    var el = ( target instanceof Node || target instanceof HTMLElement ) ? target 
                                                                         : get( target );
    Array.isArray( el ) ? el.map( i =>  modify( i, props ) ) 
                        : setAttrsToElement( el, props);  
    return el;
}
var modifyStyles = ( target, props ) => {
    var el;
    if( target instanceof HTMLCollection ){
        el = Array.from( target );
    }
    else if( Array.isArray(target) ){
        for( var item in target ){
            if( ! ( item instanceof HTMLElement || item instanceof Node ) ) {
                console.log( 'Array passed is not an Array of DOM Elements.' );
                return;
            }
        }
    }
    else if( target instanceof Node || target instanceof HTMLElement ){
        el = target;
    }
    else {
        el = get( target );
    }
    // var el = ( target instanceof Node || target instanceof HTMLElement ) ? target 
    //                                                                      : get( target );
    Array.isArray( el ) ? el.map( i =>  modifyStyles( i, props ) ) 
                        : setStylesToElement( el, props);  
    return el;
}

var setAttrsToElement =( target, props )=>{

    if(!(target instanceof Node || target instanceof HTMLElement)){
        console.log('target is not an DOM element');
        return;
    }
    for( var key in props ){
        if (key =='innerText'){
            target.innerText = props[key]; 
            continue;
        }
        else if (key =='innerHTML'){
            target.innerHTML = props[key]; 
            continue;
        }
        target.setAttribute( key, props[key] )
    }
    
    return target;
}
var setStylesToElement =( target, props )=>{

    if(!(target instanceof Node || target instanceof HTMLElement)){
        console.log('target is not an DOM element');
        return;
    }
    for( var key in props ){
        target.style[ key ] = props[ key ];
    }
    
    return target;
}
//(()=>{
//    doc ready
//})();