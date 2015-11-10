/**
 * VALID KEYS HANDLER - allows only certain values in the inputArea
 *
 * This function handles the keyboard input values that are allowed to appear in the inputArea
 * Basically, we only allow numbers, a single minus sign (for negatives), a single 0, and a single decimal
 * Otherwise, if the key is an operand, we send it to be included in the answer area, but NOT the inputArea
 * If the key is a BACKSPACE, it's already handled by the previous onkeydown function
 *
 * @param   onkeypress event  e
 * @return  boolean           TRUE = allow in inputArea
 */
function isValidKey( key ) {
  if ( validKeys.indexOf( key ) != -1 && field.value == "0" ) field.value = "";
  else if ( validKeys.indexOf( key ) != -1 && field.value == "-0" ) field.value = "-";
  
  // the following key values can be TRUE (input into inputArea)
  if ( validKeys.indexOf( key ) != -1 && field.value != "0" && !hasDecimal( key ) ) { // if the key is in the validKeys array AND the field isn't "O" AND there's no decimal, then the key is VALID
    if ( key == 46 && field.value == "" ) {        // if we're typing a decimal (and there's no value in the field),
      field.value += "0";     // add a "0" to the start
      // sendtoAnswerField( "0" );
    }
    else if ( key == 45 ) { // else if we're typing a negative, and there isn't already one there,
      dealWithNegative();     // pass it to a function to deal with it (if empty, add the symbol, if not, perform a subtraction operation)
      return false;           // return FALSE so we don't add more than one negative sign to the inputArea
    }
    return true;  // TRUE - only for the keys that can fill the inputArea
  }
  
  // the following keys are always FALSE (not input into inputArea), but we do certain other actions FIRST before returning false
  else if ( operatorKeys.indexOf( key ) != -1 ) // if we pushed an operand key
    addOperand( key );
  else if ( key == 13 || key == 61 )  // if we pushed ENTER or =
    calculate();
  return false;   // FALSE if not in the validKeys array, OR the field is already "0", OR there's already a decimal
} // END isValidKey( e )

/**
 * DECIMAL POINT CHECKER
 *
 * This function not only checks the inputArea for a pre-existing decimal (returning FALSE if there isn't one),
 * it ALSO checks to be sure that if there IS a decimal already, we are not pushing the decimal key again.
 * If there IS a decimal and we are NOT pushing the decimal key, it returns FALSE 
 * Otherwise, there is no decimal and we're pushing the decimal key for the first time, it returns TRUE.
 *
 * @param   keyCode   key
 * @return  boolean   true if no decimal
 */
function hasDecimal( key ) {
  if( field.value.indexOf( "." ) == -1 )  // if there's NO decimal
    return false;
  else if ( field.value.indexOf( "." ) != -1 && ( key != 46 && key != 190 ) ) // OR if there is a decimal, and we're NOT pushing the decimal key
    return false;
  //sendtoAnswerField( "." );
  return true;
} // END hasDecimal( key )

/**
 * DECIMAL POINT handling functions
 */
function addDecimal( keyCode ) {
  if ( !hasDecimal( keyCode ) ) {
    if ( field.value == "" || field.value == "-" ) {
      field.value += "0";
      //sendtoAnswerField( "0" );
    } 
    field.value += ".";
    //sendtoAnswerField( "." );
  }
} // END addDecimal()

/*
 * TOGGLE NEGATIVE SYMBOL
 * 
 * Adds a negative symbol at the beginning of a new number, 
 * OR performs a subtraction operation if pressed after there are already numbers in the inputArea
 */
function dealWithNegative() {
  if ( field.value == "" ) {  // if the inputArea is empty, add a single negative sign
    field.value += "-";
    //sendtoAnswerField( "-" );
  }
  else                        // OR, perform a subtraction operation
    addOperand( "-" );
}

function doInput( e ) { 
  if( buttonClicked ) {
    field.value += e;
    //sendtoAnswerField( e );
  }
}

function addParens() {
  return "(";
}

function sendtoAnswerField( char ) {
  if ( char == "." && currentValue.indexOf( "." ) == -1 )
    currentValue += "."
  else if ( char != "." )
    currentValue += char;
  answer.innerHTML = expression + currentValue;
}

function deleteValue( event ) {
  if ( field.value == "" && operands.length > 0 ) {
    values.pop();
    answer.innerHTML = "";
    // delete entire last value from answerfield
    // delete entire last value from formula
  }
  else if ( event == 8 || event == 46 || event == "←" ) {
    if ( field.value == "" ) {
      answer.innerHTML = "";
    } else {
      answer.innerHTML = answer.innerHTML.replace( /.$/, '' );
      //formula = formula.replace( /.$/, '' );
      if ( event == "←" )
        field.value = field.value.replace( /.$/, '' );
    }
  }
}