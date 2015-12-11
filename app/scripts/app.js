$(document).ready(function() {

  $('#newTaskForm').hide();
  var listo = [];

  var populateStorage = function() {
    if (listo) {
      var str = JSON.stringify(listo);
      localStorage.setItem('list', str);
    }
  }

  var readFromStorage = function() {
    var str = '';
    str = localStorage.getItem('list');
    if (str) {
      listo = JSON.parse(str);
    }
  }

  var displayList = function() {
    if (listo) {
      $('#newItemInput').val('');
      for (var i = 0; i < listo.length; i++) {
        var str = '<a href="#" class="" id="item"><li class="li-group-item">'
                  + listo[i].task + '<span class="arrow pull-right">' +
                  '<i class="glyphicon glyphicon-arrow-right"></span></li></a>';
        switch(listo[i].id) {
          case 'new':
            $('#newList').append(str);
            break;
          case 'inProgress':
            $('#currentList').append(str);
            break;
          case 'archived':
            $('#archivedList').append(str);
            break;
        }
      }
      /* $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear'); */
    }
  }

  var advanceTask = function(task) {
    var modified = task.innerText.trim()
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        } else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        } else {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
    populateStorage();
  };


  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  };

  var addTask = function(task) {
      if(task) {
        task = new Task(task);
        listo.push(task);
        populateStorage();
        $('#newItemInput').val('');
        var str = '<a href="#" class="" id="item"><li class="li-group-item">'
                + task.task + '<span class="arrow pull-right">' +
                '<i class="glyphicon glyphicon-arrow-right"></span></li></a>';

        $('#newList').append(str);
      }
      $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
  }

  readFromStorage();
  displayList();

  $('#saveNewItem').on('click', function (e) {
      e.preventDefault();
      var task = $('#newItemInput').val().trim();
      addTask(task);
  });

  $('#newListItem').on('click', function () {
     $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
 });
 //closes form
 $('#cancel').on('click', function (e) {
     e.preventDefault();
     $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
 });

 $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
 });

 $(document).on('click', '#inProgress', function (e) {
   e.preventDefault();
   var task = this;
   task.id = "archived";
   var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
   advanceTask(task);
   $('#archivedList').append(changeIcon);
 });

 $(document).on('click', '#archived', function (e) {
   e.preventDefault();
   var task = this;
   advanceTask(task);
 });


});
