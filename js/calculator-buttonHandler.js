/**
 * BUTTON CLICKER
 *
 * Setup event listeners for every button in the calculator and perform actions based on input
 * Whenever a button is clicked, set the "buttonClicked" flag to TRUE and pass the innerHTML value
 * to the keyListener button handler. After keyListener runs, remark the "buttonClicked" flag to FALSE
 * to be ready for another click later (in case there is keyboard input in between)
 */
function setupButtons() {  
  for (var i = 0; i < buttons.length; i++) {   // for every single button
    buttons[i].onclick = function() {          // listen for a click
      var button = this.innerHTML;
      
      buttonClicked = true;                   // when we click a button, set the global var to TRUE so we can use keyListener() properly
      buttonListener( button );               // send data to buttonListener()
      buttonClicked = false;                  // reset buttonClicked to FALSE so we are ready for EITHER a button click OR keyboard input again
    };
  }
} // END setupButtons()

/**
 * BUTTON LISTENER - listens for button clicks on the calculator Object itself
 *
 * @param   String  innerHTML of the button clicked
 */
function buttonListener( keyValue ) { 
  if ( keyValue == "=" )
    // 1 click = calculate total
    // 2 clicks = re-calculate using "result" and "previousOperand"
    calculate();
  else if ( keyValue == "." ) 
    // search the "inputArea" for a decimal
    // if empty, add "0."
    // if not empty, add "."
    addDecimal( 46 );
  else if ( keyValue == "-" )
    dealWithNegative();
  else if ( keyValue == "+" || keyValue == "*" || keyValue == "&times;" || keyValue == "/" || keyValue == "&divide;" || keyValue == "%" )
    // clear inputArea
    // 1. if inputArea is empty AND "-", add "-" to the value and make it negative
    // 2. if inputArea is empty and NOT "-", rewrite "previousOperand" with this one + push onto stack
    // 3. if inputArea is NOT empty, add " " + operand + " " to the expression, but 
    // 2. OR 
    addOperand( keyValue );
  else if ( keyValue == "( )" )
    doInput( addParens() );
  else if ( keyValue == "←" )
    deleteValue( keyValue );
  else if ( keyValue == "AC" )
    clearAll();
  /*else if ( field.value == "" && keyValue == "0" )
    return;*/
  else
    doInput( keyValue );
} // END keyListener( keyValue )