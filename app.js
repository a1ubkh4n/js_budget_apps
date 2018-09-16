// BUDGET CONTROLLER
var budgetController = (function() {
  


})();

// UI CONTROLLER
var UIController = (function() {
  

})();

// GLOBAL APPLICATION CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

  var addButton = document.querySelector('.add-btn');

  var controlAddItem = function() {
  // Get the filled input data

   // Add the item to the budget controller

  // Add the item to the UI

  // Calculate the budget 

  // display the budget on the UI
  };

  addButton.addEventListener('click', controlAddItem);
  document.addEventListener('keypress', controlAddItem);

  function keyPressEventHadler(event) {
    if(event.keyCode === 13 || event.which === 13) {
      controlAddItem();
    }
  }
  

})(budgetController, UIController);