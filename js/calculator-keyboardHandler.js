/**
 * KEYBOARD LISTENER
 *
 * Setup the keyboard to only allow certain input and also to detect certain other keypresses like BACKSPACE
 * onkeypress events, we check if the key is valid or not, 
 * if TRUE, we can input the value to inputArea - if FALSE, do something else, but don't send the value to inputArea
 * onkeydown events, we only listen for the BACKSPACE key - which doesn't fire onkeypress events
 * if BACKSPACE, take care of deletion of values
 */
function setupKeyboard() {
  field.onkeypress = function( event ) {    // whenever a key is pressed, 
    var key = event.keyCode;
    
    if ( ( validKeys.indexOf( key ) != -1 || operatorKeys.indexOf( key ) != -1 ) && !hasDecimal( key ) )  // these keys are POSSIBLE to pass into the answer field
      if ( key == 46 ) // this is a decimal
        addDecimal( key );
      sendtoAnswerField( String.fromCharCode( key ) );
    
    return isValidKey( key );     // check whether it's valid or not, if FALSE - we don't allow that input
  }
  field.onkeydown = function( event ) {     // onkeydown fires with BACKSPACE or DELETE, but onkeypress will not
    var key = event.keyCode;                // get the numeric keyCode
    if ( key == 8 || key == 46 )            // keyCode = 8 is BACKSPACE, 46 is DELETE with onkeydown, but a decimal . onkeypress
      deleteValue( key );                   // call the deleteValue() function to handle this
    if ( key == 187 )
      field.value = "";
  }
  /*field.onkeydown = function( event ) {
    var key = event.keyCode;
    alert(key);
    if ( validKeyDowns.indexOf( key ) != -1 ) {
      if ( key == 190 && !hasDecimal( key ) )                 // this is a decimal point for onkeyup
        sendtoAnswerField( "." );
      sendtoAnswerField( convertKeytoChar( key ) );
    }
  }*/
} // END setupKeyboard()