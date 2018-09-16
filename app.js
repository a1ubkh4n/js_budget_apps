

// BUDGET CONTROLLER
var budgetController = (function() {
  


})();

// UI CONTROLLER
var UIController = (function() {

  var DOMString = {
    inputType : '.add-type',
    inputDescription : '.add-description',
    inputValue : '.add-value',
    inputButton : '.add-btn'
  };
  
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMString.inputType).value, // will be either income or expenses
        description: document.querySelector(DOMString.inputDescription).value,
       value: document.querySelector(DOMString.inputValue).value
      };     
    },
    getDOMStrings: function() {
      return DOMString;
    }
  };

})();

// GLOBAL APPLICATION CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {

    var DOM = UICtrl.getDOMStrings();
    var addButton = document.querySelector(DOM.inputButton);

    addButton.addEventListener('click', controlAddItem);

    document.addEventListener('keypress', keyPressEventHandler);

    function keyPressEventHandler(event) {
      if(event.keyCode === 13 || event.which === 13) {
        controlAddItem();
      }
    }  
  };

  var controlAddItem = function() {
  // Get the filled input data
    var input = UICtrl.getInput();

   // Add the item to the budget controller
    
  // Add the item to the UI

  // Calculate the budget 

  // display the budget on the UI
  };

  return {
    init: function() {
      console.log('Application has started.');
      setupEventListeners();
    }
  };
  
})(budgetController, UIController);

controller.init();