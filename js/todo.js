const input = document.getElementById('taskInput');
    const list = document.getElementById('taskList');

    function addTask() {
    const val = input.value.trim();
    if (!val) return;

    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between align-items-center fade show";

    const span = document.createElement('span');
    span.className = "task-text flex-grow-1 text-break fadeIn";
    span.textContent = val; 

    const btnGroup = document.createElement('div');
    btnGroup.className = "btn-group btn-group-sm ms-2";

    //  Define and create buttons
    const buttons = [
        { label: '↑', class: 'move-up', style: 'btn-outline-secondary' },
        { label: '↓', class: 'move-down', style: 'btn-outline-secondary' },
        { label: 'Urgent', class: 'urgent', style: 'btn-outline-warning' },
        { label: 'Done', class: 'done', style: 'btn-outline-success' },
        { label: '✕', class: 'remove-btn', style: 'btn-danger' }
    ];

    buttons.forEach(btnInfo => {
        const btn = document.createElement('button');
        btn.className = `btn ${btnInfo.style} ${btnInfo.class}`;
        btn.textContent = btnInfo.label;
        btnGroup.appendChild(btn);
    });

    // add to dom
    li.append(span, btnGroup);
    list.appendChild(li);

    // Reset input field
    input.value = '';
    input.focus();
}

    list.addEventListener("click", (e) => {
        if (e.target.classList.contains("move-up")) {
            moveListItem(e.target, -1);
            // -1 means move up, +1 means move down
        } else if (e.target.classList.contains("move-down")) {
            moveListItem(e.target, 1);
        } else if (e.target.classList.contains("urgent")) {
            toggleUrgent(e.target);
        } else if (e.target.classList.contains("done")) {
            toggleDone(e.target);
        } else if (e.target.classList.contains("remove-btn")) {
            e.target.closest('li').classList.remove('show');
            e.target.closest('li').classList.add('fader');
           e.target.closest('li').classList.add('fadedOut');

            setTimeout(() => {
                e.target.closest('li').remove();
            }, 1000);
        }
    });E