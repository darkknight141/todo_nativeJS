var input = document.getElementById('input');
var addBtn = document.getElementById('btn_add');
var list = document.getElementById('list');
var listDone = document.getElementById('list_done');
var done_task = document.getElementById('security-bar');
var todos = [];


////create object
var addTask = function() {
    if (input.value !== '') {
        var todo = { text: input.value, check: false, id: Math.random() };
        todos.push(todo);
        saveLS(todos);
        render()
    }
};
////
var saveLS = function(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadLS() {
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
        render();
    }
};
// write in obj
document.addEventListener('DOMContentLoaded', function() {
    addBtn.addEventListener('click', function(evt) {
        if (input.value == '') {
            return;
        } else {
            addTask();
        }
        input.value = '';
    })
});


let render = function() {
    list_done.innerHTML = '';
    list.innerHTML = '';
    for (var i = 0; i < todos.length; i++) {
        var li = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        if (checkbox.check == true) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
        checkbox.classList.add('cb');
        checkbox.addEventListener('click', changeTask);
        var span = document.createElement('span');
        var del = document.createElement('span')
        li.classList.add('items');
        li.id = todos[i].id;
        li.appendChild(checkbox);
        span.textContent = todos[i].text;
        span.addEventListener('dblclick', editTsk); //complite
        span.id = todos[i].id;
        li.appendChild(span);
        del.classList.add('del');
        del.textContent = 'X';
        del.addEventListener('click', delTsk); //complite
        li.appendChild(del);
        bar();


        todos[i].check ? list_done.appendChild(li) : list.appendChild(li);

    }
}
document.addEventListener('DOMContentLoaded', function() {
    render();

});
// complite
var editTsk = function(element) {
        var id = element.target.parentNode.id;
        console.log(element.target.textContent);
        li = element.target.parentNode;
        var span = element.target;
        var edit = document.createElement('input')
        li.removeChild(span);
        edit.setAttribute('type', 'text');
        edit.value = span.textContent;
        li.appendChild(edit);
        console.log(edit.value);
        edit.onblur = function() {
            if (edit.value !== span.textContent) {
                if (element.id = id) {
                    span.textContent = edit.value;
                    var find = todos.filter((e) => e.id == id);
                    console.log(find);
                    todos = todos.filter((e) => !find.includes(e));
                    var editedtask = { text: edit.value, check: false, id: element.id };
                    console.log(editedtask);
                    todos.push(editedtask);
                    saveLS(todos);
                    render()
                }
                console.log(todos);
                li.removeChild(edit);
                li.appendChild(span);
            }
        }
    }
    //complite
var delTsk = function(element) {
        var id = element.target.parentNode.id;
        var delitem = todos.filter((e) => e.id == id);
        todos = todos.filter((e) => !delitem.includes(e));
        element.target.parentNode.remove();
        saveLS(todos);
    }
    //
var changeTask = function(element) {
    var id = element.target.parentNode.id;
    var find = todos.filter((e) => e.id == id);
    todos = todos.filter((e) => !find.includes(e));
    find[0].check = !find[0].check;
    todos.push(find[0]);

    saveLS(todos);
    render();

}
var bar = function() {
    var done = todos.filter((e) => e.check == true);
    var undone = todos.filter((e) => e.check == false);
    done_task.style.width = (done.length / (done.length + undone.length)) * 100 + '%';

}


loadLS();