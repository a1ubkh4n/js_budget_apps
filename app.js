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

  var calculateTotal = function(type) {
    var sum = 0;

    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      expense: [],
      income: []
    },

    totals: {
      expense: 0,
      income: 0
    },
    budget: 0,
    percentage: -1
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

    deleteItem: function(type, id) {
      var ids, index;

      ids = data.allItems[type].map(function(current) {
        return current.id; 
      });

      index = ids.indexOf(id);

      if(index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function() {
      // Calculate total income and expenses
      calculateTotal('expense');
      calculateTotal('income');
      // Calculate the budget: income - expense
      data.budget = data.totals.income - data.totals.expense;
      // Calculate the percentage of income that we spent
      if(data.totals.income > 0) {
        data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.income,
        totalExp: data.totals.expense,
        percentage: data.percentage
      };
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
    expenseContainer : '.expenses-list',
    budgetLabel: '.budget-value',
    incomeLabel: '.budget-income-value',
    expensesLabel: '.budget-expenses-value',
    percentageLabel: '.budget-expenses-percentage',
    container: '.container'
  };
  
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMString.inputType).value, // will be either income or expenses
        description: document.querySelector(DOMString.inputDescription).value,
        value: parseFloat(document.querySelector(DOMString.inputValue).value)
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

    deleteListItem: function(selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    clearFields: function() {
      var fields, fieldsArray;

      fields = document.querySelectorAll(DOMString.inputDescription + ', ' + DOMString.inputValue);

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArray[0].focus();


    },

    displayBudget: function(obj) {

      document.querySelector(DOMString.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMString.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMString.expensesLabel).textContent = obj.totalExp;
      
      if(obj.percentage > 0) {
        document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMString.percentageLabel).textContent = '---';
      }
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
    
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

  };

  var updateBudget = function() {
    // calculate the budget
    budgetCtrl.calculateBudget();
    // return the budget
    var budget = budgetCtrl.getBudget();

    // display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  var controlAddItem = function() {
    var input, newItem;

    // Get the filled input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      
    // Add the item to the budget controller
    newItem = budgetController.addItem(input.type, input.description, input.value);

    // Add the item to the UI
    UICtrl.addListItem(newItem, input.type);

   // Clear the fields
    UICtrl.clearFields();

    // Calculate the budget 
    updateBudget();
    // display the budget on the UI

    }

  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemID) {
      // split income-0 
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // Delete the item from data structure 
      budgetCtrl.deleteItem(type, ID);
       
      // Delete the item from UI
      UICtrl.deleteListItem(itemID);

      // Update and show the new Budget
      updateBudget();
    }

  };

  return {
    init: function() {
      console.log('Application has started.');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0, 
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
  
})(budgetController, UIController);

controller.init();