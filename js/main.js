$(document).ready(()=>{
    getTasks();
});

const apiKey = 'L6Tjl7Z7EBaQ8cOBEsxQkyHE5kVdlvwW';
const getTasks = () => {
        
    $.get(`https://api.mlab.com/api/1/databases/taskmanager/collections/tasks?apiKey=${apiKey}`, data => {
        
        let output = '<ul class="list-group">';
        $.each(data, (key, task) => {
            output += '<li class="list-group-item">';
            output += `${task.task_name}<span class="due_on"> [Due on ${task.due_date}]</span`;
            if(task.is_urgent == "true"){
                output += '<span class="label label-danger">Urgent</span>'
            }
            output += '<div><a class="btn btn-primary pull-right" href="#">Edit</a><a class="btn btn-danger pull-right" href="#">Delete</a></div>'
        });
        output += '</ul>';
        $('#tasks').html(output);
    });
};

const getCategoryOptions = () => {
        
    $.get(`https://api.mlab.com/api/1/databases/taskmanager/collections/categories?apiKey=${apiKey}`, data => {
        
        let output = '<ul class="list-group">';
        let output;
        $.each(data, (key, category) => {
            output += ''
        });
        output += '</ul>';
        $('#tasks').html(output);
    });
};


