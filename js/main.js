$(document).ready(()=>{
    getTasks();
    getCategoryOptions();

    $('#add_task').on('submit', addTask);
});

const apiKey = 'L6Tjl7Z7EBaQ8cOBEsxQkyHE5kVdlvwW';
const getTasks = () => {
        
    $.get(`https://api.mlab.com/api/1/databases/taskmanager/collections/tasks?apiKey=${apiKey}`, data => {
        
        var output = '<ul class="list-group">';
        $.each(data, (key, task) => {
            output += '<li class="list-group-item">';
            output += `${task.task_name}<span class="due_on"> [Due on ${task.due_date}]</span`;
            if(task.is_urgent == "true"){
                output += '<span class="label label-danger">Urgent</span>'
            }
            output += `<div><a class="btn btn-primary pull-right btn-edit-task" data-task-name=${task.task_name} data-task-id=${task._id.$oid}>Edit</a><a class="btn btn-danger pull-right" href="#">Delete</a></div>`
        });
        output += '</ul>';
        $('#tasks').html(output);
    });
};

function addTask (e) {
    e.preventDefault();
    var task_name = $('#task_name').val();
    var category = $('#category').val();
    var due_date = $('#due_date').val();
    var is_urgent = $('#is_urgent').val();

    $.ajax({
        url: `https://api.mlab.com/api/1/databases/taskmanager/collections/tasks?apiKey=${apiKey}`,
        data: JSON.stringify({
            "task_name": task_name,
            "category": category,
            "due_date": due_date,
            "is_urgent": is_urgent
        }),
        type:'POST',
        contentType: 'application/json',
        success: function(data) {
            window.location.href = 'index.html';
        },
        error: function(xhr, status, err) {
            console.log(err);
        }
    });
}

const getCategoryOptions = () => {
        
    $.get(`https://api.mlab.com/api/1/databases/taskmanager/collections/categories?apiKey=${apiKey}`, data => {
        

        var output;
        $.each(data, (key, category) => {
            output += `<option value=${category.category_name}>${category.category_name}</option>`;
        });
        output += '</ul>';
        $('#category').append(output);
    });
};




