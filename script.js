// frontend/script.js - Versão adaptada para localStorage

// Variáveis globais
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const formTitle = document.getElementById('form-title');
const taskIdInput = document.getElementById('task-id');
const cancelEditBtn = document.getElementById('cancel-edit');

// --- Funções de Persistência (LocalStorage) ---

// 1. Carregar tarefas do LocalStorage
const getTasksFromLocalStorage = () => {
    const tasksJson = localStorage.getItem('tarefas');
    // Se não houver tarefas, retorna um array vazio. Caso contrário, faz o parse do JSON.
    return tasksJson ? JSON.parse(tasksJson) : [];
};

// 2. Salvar tarefas no LocalStorage
const saveTasksToLocalStorage = (tasks) => {
    // O erro original era aqui: precisava de JSON.stringify()
    localStorage.setItem('tarefas', JSON.stringify(tasks));
};

// --- Funções de Lógica da Aplicação ---

// Função para buscar e exibir as tarefas (agora do LocalStorage)
const fetchTasks = () => {
    const tasks = getTasksFromLocalStorage();
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
                        <button class="btn btn-sm btn-warning" onclick="editTask(${task.id}, '${task.titulo}', '${task.descricao}', '${task.data_vencimento}', '${task.prioridade}', '${task.status}')">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
        taskList.innerHTML += taskCard;
    });
};

// Função para adicionar ou atualizar uma tarefa
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = taskIdInput.value;
    const tasks = getTasksFromLocalStorage();
    let maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;

    const taskData = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        data_vencimento: document.getElementById('data_vencimento').value,
        prioridade: document.getElementById('prioridade').value,
        status: document.getElementById('status').value,
    };

    if (id) {
        // Atualizar tarefa existente
        const index = tasks.findIndex(t => t.id == id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...taskData };
        }
    } else {
        // Adicionar nova tarefa
        taskData.id = maxId + 1; // Atribuir novo ID
        tasks.push(taskData);
    }

    saveTasksToLocalStorage(tasks); // Salvar no LocalStorage
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
window.deleteTask = (id) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(t => t.id !== id);
        saveTasksToLocalStorage(tasks); // Salvar no LocalStorage
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
Gerenciamento de Tarefas Website - Manus
