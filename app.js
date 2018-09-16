// BUDGET CONTROLLER
var budgetController = (function() {
  
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems:{
      expense: [],
      income: []
    },

    totals: {
      expense: 0,
      income: 0
    }
  };

  return {
    addItem : function(type, des, val) {
      var newItem, ID;

      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item based on 'income' or 'expense'
      if (type === 'expense') {
        newItem = new Expense(ID, des, val);
      } else if(type === 'income') {
        newItem = new Income(ID, des, val);
      }

      // Push it into data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },

    testing : function() {
      console.log(data);
    }
  };

})();

// UI CONTROLLER
var UIController = (function() {

  var DOMString = {
    inputType : '.add-type',
    inputDescription : '.add-description',
    inputValue : '.add-value',
    inputButton : '.add-btn',
    incomeContainer : '.income-list',
    expenseContainer : '.expenses-list' 
  };
  
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMString.inputType).value, // will be either income or expenses
        description: document.querySelector(DOMString.inputDescription).value,
        value: document.querySelector(DOMString.inputValue).value
      };     
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder text
      if (type === 'income') {
        element = DOMString.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-delete"><button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'expense') {
        element = DOMString.expenseContainer;
        html =  '<div class="item clearfix" id="expense-%id%"><div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-percentage">21%</div><div class="item-delete"><button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      
      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


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
    var input, newItem;

  // Get the filled input data
    input = UICtrl.getInput();

   // Add the item to the budget controller
    newItem = budgetController.addItem(input.type, input.description, input.value);

  // Add the item to the UI
  UICtrl.addListItem(newItem, input.type);

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