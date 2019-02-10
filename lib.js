class lib  {
    constructor( selector ){
       this.curEl = this.get( selector );
    }

    get = ( selector ) => { 

        if( ! ( typeof selector === 'string' || selector instanceof String ) ){
            return window;
        }

        return selector[0] === '#' ? document.querySelector( selector )
                                   : Array.from( document.querySelectorAll( selector ) );

    }

    remove = () => {
        Array.isArray( this.curEl ) ? this.curEl.map( i => i.remove() ) 
                                    : this.curEl.remove();
        this.curEl = null;
    }

    create = ( tagName, props ) => {
        if( tagName == undefined || tagName == null ){
            console.log( 'TagName invalid' );
            return;
        }

        var createElement = ( tagName, props ) => {
            var el = document.createElement( tagName );
            this.setAttrsToElement( el, props);
            return el;
        }
        this.curEl = Array.isArray( this.curEl ) ? this.curEl.map( i => i.appendChild( createElement( tagName, props ) ) )
                                                 : this.curEl.appendChild( createElement(tagName, props ) )
        return this;
    }

    modify = ( props ) => {
        Array.isArray( this.curEl ) ? this.curEl.map( i =>  setAttrsToElement( i, props ) ) 
                                    : setAttrsToElement( this.curEl, props);  
        return this;
    }

    modifyStyles = ( props ) => {
        var setStylesToElement = ( target, props )=>{

            if(!(target instanceof Node || target instanceof HTMLElement)){
                console.log('target is not an DOM element');
                return;
            }
            for( var key in props ){
                target.style[ key ] = props[ key ];
            }
            
            return target;
        }

        Array.isArray( this.curEl ) ? this.curEl.map( i =>  setStylesToElement( i, props ) ) 
                                    : setStylesToElement( this.curEl, props);  
        return this;
    }
    parrent = () =>{
        this.curEl = Array.isArray( this.curEl ) ? this.curEl.map( i => i.parentElement )
                                                 : document.getParrent( this.curEl );
        return this;
    }
    nextSibling = () =>{
        this.curEl = Array.isArray( this.curEl ) ? this.curEl.map( i => i.nextSibling )
                                                 : this.curEl.nextSibling;
        return this;
    }
    prevSibling = () =>{
        this.curEl = Array.isArray( this.curEl ) ? this.curEl.map( i => i.previousSibling )
                                                 : this.curEl.previousSibling;
        return this;
    }
    children = () =>{
        this.curEl = Array.isArray( this.curEl ) ? this.curEl.map( i => i.children )
                                                 : this.curEl.children;
        return this;
    }

    
    setEventHandlers = ( props ) =>{
        var setEvHandlerForTarget = ( target, props ) =>{
            for( var key in props ){
                target[ key ] = props[ key ]
            }
        }

        Array.isArray( this.curEl ) ? this.curEl.map( i => setEvHandlerForTarget( i, props ) )
                                    : setEvHandlerForTarget( this.curEl, props );
        return this;
    }
}

const $ = ( selector ) => { return new lib( selector ) };

// (()=>{

// })();