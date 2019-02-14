class lib  {
    setCurEl = ( selector ) => {
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

    append = ( tagName, props ) => {
        return this.privateCreate( tagName, props, false )
    }

    create = (  tagName, props ) => {
       return this.privateCreate( tagName, props, true )
    }

    modify = ( props ) => {
        Array.isArray( this.curEl ) ? this.curEl.map( i =>  this.setAttrsToElement( i, props ) ) 
                                    : this.setAttrsToElement( this.curEl, props);  
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

    setEventHandler = ( props ) =>{
        var setEvHandlerForTarget = ( target, props ) =>{
            for( var key in props ){
                target[ key ] = props[ key ]
            }
        }

        Array.isArray( this.curEl ) ? this.curEl.map( i => setEvHandlerForTarget( i, props ) )
                                    : setEvHandlerForTarget( this.curEl, props );
        return this;
    }

    parrent = () =>{
        this.curEl = Array.isArray( this.curEl ) ? this.curEl.map( i => i.parentElement )
                                                 : document.getParrent( this.curEl );
        return this;
    }
    nextSibling = () =>{
        this.curEl = Array.isArray( this.curEl ) ? this.curEl.map( i => i.nextSibling  )
                                                 : this.curEl.nextSibling;
        return this;
    }
    prevSibling = () =>{
        this.curEl = Array.isArray( this.curEl ) ? this.curEl.map( i =>  i.previousSibling )
                                                 : this.curEl.previousSibling;
        return this;
    }
    children = () =>{

        var toOneDimArr = ( twoDimArr ) => {
            var arr = [];
            for( var i = 0; i < twoDimArr.length; ++i ){
                for( var j = 0; j < twoDimArr[i].length; ++j){
                    arr.push( twoDimArr[i][j] );
                }
            }
            return arr;
        }

        this.curEl = Array.isArray( this.curEl ) ? toOneDimArr( this.curEl.map( i => Array.from( i.children ) ) )
                                                 : Array.from( this.curEl.children );
        return this;
    }

    //private
    setAttrsToElement ( target, props ){
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

    //private
    privateCreate = ( tagName, props, goDeeper ) => {
        if( tagName == undefined || tagName == null ){
            console.log( 'TagName invalid' );
            return;
        }

        var createElement = ( tagName, props ) => {
            var el = document.createElement( tagName );
            this.setAttrsToElement( el, props);
            return el;
        }

        var createdEl = Array.isArray( this.curEl ) ? this.curEl.map( i => i.appendChild( createElement( tagName, props ) ) )
                                                    : this.curEl.appendChild( createElement(tagName, props ) )

        this.curEl = goDeeper ? createdEl : this.curEl;

        return this;
    }
}

var domLib = new lib();

const $ = ( selector ) => { 
    domLib.setCurEl( selector );
    return domLib;
};