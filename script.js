// Variáveis globais
// Verifique se estes IDs (task-form, task-list, form-title, task-id, cancel-edit)
// correspondem exatamente aos IDs no seu ficheiro index.html.
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const formTitle = document.getElementById('form-title');
const taskIdInput = document.getElementById('task-id');
const cancelEditBtn = document.getElementById('cancel-edit');

// --- Funções de Persistência (LocalStorage) ---

// 1. Carregar tarefas do LocalStorage
const getTasksFromLocalStorage = () => {
    // Usar uma chave única e consistente
    const tasksJson = localStorage.getItem('tarefas_salvas'); 
    // Se não houver tarefas, retorna um array vazio. Caso contrário, faz o parse do JSON.
    return tasksJson ? JSON.parse(tasksJson) : [];
};

// 2. Salvar tarefas no LocalStorage
const saveTasksToLocalStorage = (tasks) => {
    // Usar a mesma chave única e consistente
    localStorage.setItem('tarefas_salvas', JSON.stringify(tasks));
};

// --- Funções de Lógica da Aplicação ---

// Função para buscar e exibir as tarefas (agora do LocalStorage)
const fetchTasks = () => {
    const tasks = getTasksFromLocalStorage();
    taskList.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

    tasks.forEach(task => {
        // Garantir que a data de vencimento é formatada corretamente
        const formattedDate = task.data_vencimento ? new Date(task.data_vencimento + 'T00:00:00').toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '';
        
        // Escapar aspas simples para uso seguro no onclick
        const escapeString = (str) => (str || '').replace(/'/g, "\\'");
        
        const editTaskArgs = [
            task.id, 
            escapeString(task.titulo), 
            escapeString(task.descricao), 
            task.data_vencimento, // Manter o formato YYYY-MM-DD para o input
            task.prioridade, 
            task.status
        ].map(arg => `'${arg}'`).join(', ');

        const taskCard = `
            <div class="col-md-4 mb-3">
                <div class="card priority-${task.prioridade}">
                    <div class="card-body">
                        <h5 class="card-title">${task.titulo}</h5>
                        <p class="card-text">${task.descricao || ''}</p>
                        <p class="card-text"><small class="text-muted">Vencimento: ${formattedDate}</small></p>
                        <p class="card-text"><small class="text-muted">Prioridade: ${task.prioridade}</small></p>
                        <p class="card-text"><small class="text-muted">Status: ${task.status}</small></p>
                        <button class="btn btn-sm btn-warning" onclick="editTask(${editTaskArgs})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
        taskList.innerHTML += taskCard;
    });
};

// Função para adicionar ou atualizar uma tarefa
if (taskForm) {
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = taskIdInput.value;
        const tasks = getTasksFromLocalStorage();
        // Correção: Usar um ID sequencial para garantir que o ID não se repete
        let maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;

        const taskData = {
            // Correção: Garantir que os IDs dos inputs estão corretos no HTML
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
                // Preservar o ID original e atualizar os outros campos
                tasks[index] = { id: parseInt(id), ...taskData };
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
}


// Função para preencher o formulário para edição
window.editTask = (id, titulo, descricao, data_vencimento, prioridade, status) => {
    if (formTitle) formTitle.textContent = 'Editar Tarefa';
    if (taskIdInput) taskIdInput.value = id;
    if (document.getElementById('titulo')) document.getElementById('titulo').value = titulo;
    if (document.getElementById('descricao')) document.getElementById('descricao').value = descricao;
    if (document.getElementById('data_vencimento')) document.getElementById('data_vencimento').value = data_vencimento;
    if (document.getElementById('prioridade')) document.getElementById('prioridade').value = prioridade;
    if (document.getElementById('status')) document.getElementById('status').value = status;
    if (cancelEditBtn) cancelEditBtn.style.display = 'inline-block';
    window.scrollTo(0, 0); // Rola para o topo da página
};

// Função para deletar uma tarefa
window.deleteTask = (id) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        let tasks = getTasksFromLocalStorage();
        // Correção: Garantir que a comparação é estrita ou que o tipo é o mesmo
        tasks = tasks.filter(t => t.id !== parseInt(id)); 
        saveTasksToLocalStorage(tasks); // Salvar no LocalStorage
        fetchTasks();
    }
};

// Função para limpar o formulário
const resetForm = () => {
    if (formTitle) formTitle.textContent = 'Adicion// Variáveis globais
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
        // Correção: Garantir que a data de vencimento é formatada corretamente
        const formattedDate = task.data_vencimento ? new Date(task.data_vencimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '';
        
        // Correção: Garantir que todos os argumentos de string para editTask estão entre aspas simples
        const editTaskArgs = [
            task.id, 
            task.titulo.replace(/'/g, "\\'"), // Escapar aspas simples
            (task.descricao || '').replace(/'/g, "\\'"), 
            task.data_vencimento, 
            task.prioridade, 
            task.status
        ].map(arg => `'${arg}'`).join(', ');

        const taskCard = `
            <div class="col-md-4 mb-3">
                <div class="card priority-${task.prioridade}">
                    <div class="card-body">
                        <h5 class="card-title">${task.titulo}</h5>
                        <p class="card-text">${task.descricao || ''}</p>
                        <p class="card-text"><small class="text-muted">Vencimento: ${formattedDate}</small></p>
                        <p class="card-text"><small class="text-muted">Prioridade: ${task.prioridade}</small></p>
                        <p class="card-text"><small class="text-muted">Status: ${task.status}</small></p>
                        <button class="btn btn-sm btn-warning" onclick="editTask(${editTaskArgs})">Editar</button>
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
            // Preservar o ID original e atualizar os outros campos
            tasks[index] = { id: parseInt(id), ...taskData };
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
document.addEventListener('DOMContentLoaded', fetchTasks); // Correção: Garantir que fetchTasks é chamado após o DOM estar pronto
// fetchTasks(); // Removido para evitar chamada dupla se o utilizador já tiver esta linha no HTML
Gerenciamento de Tarefas Website - Manus

