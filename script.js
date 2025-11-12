// frontend/script.js
document.addEventListener('DOMContentLoaded', ( ) => {
    const apiUrl = 'http://localhost:3000/api/tarefas';
    const taskForm = document.getElementById('task-form' );
    const taskList = document.getElementById('task-list');
    const formTitle = document.getElementById('form-title');
    const taskIdInput = document.getElementById('task-id');
    const cancelEditBtn = document.getElementById('cancel-edit');

    // Função para buscar e exibir as tarefas
    const fetchTasks = async () => {
        const response = await fetch(apiUrl);
        const tasks = await response.json();
        taskList.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

        tasks.forEach(task => {
            const taskCard = `
                <div class="col-md-4 mb-3">
                    <div class="card priority-${task.prioridade}">
                        <div class="card-body">
                            <h5 class="card-title">${task.titulo}</h5>
                            <p class="card-text">${task.descricao || ''}</p>
                            <p class="card-text"><small class="text-muted">Vencimento: ${new Date(task.data_vencimento).toLocaleDateString()}</small></p>
                            <p class="card-text"><small class="text-muted">Prioridade: ${task.prioridade}</small></p>
                            <p class="card-text"><small class="text-muted">Status: ${task.status}</small></p>
                            <button class="btn btn-sm btn-warning" onclick="editTask(${task.id}, '${task.titulo}', '${task.descricao || ''}', '${task.data_vencimento.split('T')[0]}', '${task.prioridade}', '${task.status}')">Editar</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Excluir</button>
                        </div>
                    </div>
                </div>
            `;
            taskList.innerHTML += taskCard;
        });
    };

    // Adicionar ou Atualizar Tarefa
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = taskIdInput.value;
        const taskData = {
            titulo: document.getElementById('titulo').value,
            descricao: document.getElementById('descricao').value,
            data_vencimento: document.getElementById('data_vencimento').value,
            prioridade: document.getElementById('prioridade').value,
            status: document.getElementById('status').value
        };

        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUrl}/${id}` : apiUrl;

        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });

        resetForm();
        fetchTasks();
    });

    // Função para preencher o formulário para edição
    window.editTask = (id, titulo, descricao, data_vencimento, prioridade, status) => {
        formTitle.textContent = 'Editar Tarefa';
        taskIdInput.value = id;
        document.getElementById('titulo').value = titulo;
        document.getElementById('descricao').value = descricao;
        document.getElementById('data_vencimento').value = data_vencimento;
        document.getElementById('prioridade').value = prioridade;
        document.getElementById('status').value = status;
        cancelEditBtn.style.display = 'inline-block';
        window.scrollTo(0, 0); // Rola para o topo da página
    };

    // Função para deletar uma tarefa
    window.deleteTask = async (id) => {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            fetchTasks();
        }
    };

    // Função para limpar o formulário
    const resetForm = () => {
        formTitle.textContent = 'Adicionar Nova Tarefa';
        taskForm.reset();
        taskIdInput.value = '';
        cancelEditBtn.style.display = 'none';
    };

    // Evento para o botão de cancelar edição
    cancelEditBtn.addEventListener('click', resetForm);

    // Carrega as tarefas ao iniciar a página
    fetchTasks();
});
