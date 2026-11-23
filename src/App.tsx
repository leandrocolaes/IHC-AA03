import { useEffect, useState } from "react";

const A = "/assets";
type Screen = "signup" | "home" | "task" | "details";
type Priority = "Baixa" | "Média" | "Alta";
type TaskItem = { id: number; title: string; meta: string; priority: Priority; subtasks: string[] };

const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <img alt="" aria-hidden="true" className={className} src={`${A}/${name}.svg`} />
);

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className="primary-button" onClick={onClick}>
      {children}
    </button>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  action,
  value,
  onChange,
  maxLength,
  onAction,
}: {
  label: string;
  placeholder: string;
  type?: string;
  action?: string;
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  onAction?: () => void;
}) {
  return (
    <label className="field">
      <span className="field-heading">
        <span>{label}</span>
        {maxLength && <span className="character-count">{value?.length || 0}/{maxLength}</span>}
      </span>
      <span className="input-shell">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={(event) => onChange?.(event.target.value)}
        />
        {action && <button type="button" onClick={onAction}>{action}</button>}
      </span>
    </label>
  );
}

function Signup({
  go,
  name,
  setName,
}: {
  go: (screen: Screen) => void;
  name: string;
  setName: (name: string) => void;
}) {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const generateCode = () => {
    setCode(String(Math.floor(100000 + Math.random() * 900000)));
  };

  return (
    <main className="screen white">
      <header className="signup-header content-width">
        <h1>Bem-vindo ao<br />Planneta!</h1>
      </header>
      <div className="scroll-area">
        <div className="signup-content content-width">
          <p className="intro">Sua rotina, do seu jeito.<br />Sem e-mail e sem complicação.</p>
          <section>
            <h2>Sobre você</h2>
            <Field label="Nome ou apelido" placeholder="Como você gosta de ser chamado?" value={name} onChange={setName} maxLength={12} />
            <label className="field">
              <span>Série / ano</span>
              <span className="input-shell">
                <select defaultValue="">
                  <option value="" disabled>Selecione sua série ou ano</option>
                  <option>8º ano</option>
                  <option>9º ano</option>
                  <option>1º ano do Ensino Médio</option>
                </select>
                <Icon name="07244" />
              </span>
            </label>
          </section>
          <section>
            <h2>Sua conta</h2>
            <Field label="Nome de usuário único" placeholder="Ex: davi_estuda" value={username} onChange={setUsername} maxLength={20} />
            <p className="help">Escolha um nome único. Use letras, números e _.</p>
            <Field
              label="Senha"
              placeholder="Crie uma senha"
              type={showPassword ? "text" : "password"}
              action={showPassword ? "Ocultar" : "Mostrar"}
              onAction={() => setShowPassword((visible) => !visible)}
              value={password}
              onChange={setPassword}
              maxLength={64}
            />
            <p className="help">Use pelo menos 8 caracteres.</p>
          </section>
          <aside className="privacy-card">
            <div><Icon name="8c062" /><strong>Você escolhe com quem dividir</strong></div>
            <p>Quer compartilhar suas conquistas com seus pais? Gere um código seguro para eles.</p>
            <button onClick={generateCode}>{code ? `Código: ${code}` : "Gerar código de 6 dígitos"}</button>
            <small>Opcional. Você pode fazer isso depois.</small>
          </aside>
          <p className="control-note"><Icon name="521c4" />Seus dados continuam sob seu controle.</p>
        </div>
      </div>
      <footer className="signup-footer content-width">
        <PrimaryButton onClick={() => go("home")}>
          Entrar no Planneta <Icon name="c2bb0" />
        </PrimaryButton>
        <button className="text-link" onClick={() => go("home")}>Já tem uma conta? Entrar</button>
      </footer>
    </main>
  );
}

const initialTasks: TaskItem[] = [
  { id: 1, title: "Prova de Matemática", meta: "Amanhã · Matemática", priority: "Alta", subtasks: ["Revisar fórmulas principais"] },
  { id: 2, title: "Dever de Ciências", meta: "Quinta-feira · Ciências", priority: "Média", subtasks: [] },
  { id: 3, title: "Leitura de Português", meta: "Sexta-feira · Português", priority: "Baixa", subtasks: [] },
];

const dateRank = (task: TaskItem) => {
  const date = task.meta.split(" · ")[0];
  if (date === "Hoje") return 0;
  if (date === "Amanhã") return 1;
  return 2;
};

const priorityRank: Record<Priority, number> = { Alta: 0, Média: 1, Baixa: 2 };

function Home({
  go,
  name,
  tasks,
  openTask,
  completeTask,
  startNewTask,
  resetApp,
}: {
  go: (screen: Screen) => void;
  name: string;
  tasks: TaskItem[];
  openTask: (task: TaskItem) => void;
  completeTask: (id: number) => void;
  startNewTask: () => void;
  resetApp: () => void;
}) {
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [taskToConfirm, setTaskToConfirm] = useState<TaskItem | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; tone: "default" | "danger" } | null>(null);
  const sortedTasks = [...tasks].sort(
    (first, second) =>
      dateRank(first) - dateRank(second) ||
      priorityRank[first.priority] - priorityRank[second.priority],
  );

  useEffect(() => {
    if (!snackbar) return;
    const timer = window.setTimeout(() => setSnackbar(null), 5000);
    return () => window.clearTimeout(timer);
  }, [snackbar]);

  const confirmCompletion = () => {
    if (!taskToConfirm) return;
    completeTask(taskToConfirm.id);
    setTaskToConfirm(null);
    setSnackbar({ message: "Tarefa Concluída com sucesso", tone: "default" });
  };

  return (
    <main className="screen home-screen">
      {snackbar && <div className={`snackbar ${snackbar.tone}`} role="status">{snackbar.message}</div>}
      <header className="home-header content-width">
        <div className="home-heading">
          <button className="icon-button" aria-label="Reiniciar aplicativo" onClick={resetApp}>
            <Icon name="dabaf" />
          </button>
          <div>
            <h1>Olá, {name.trim() || "Davi"}!</h1>
            <p>Vamos cuidar de uma coisa de cada vez.</p>
          </div>
        </div>
        <button
          className={`bell-button ${notificationsActive ? "selected" : ""}`}
          aria-label={notificationsActive ? "Desativar notificações" : "Ativar notificações"}
          aria-pressed={notificationsActive}
          onClick={() => setNotificationsActive((active) => !active)}
        >
          <Icon name="f0484" />
        </button>
      </header>
      <div className="scroll-area">
        <div className="home-content content-width">
          <div>
            <h2>O que exige sua<br />atenção hoje</h2>
            <p className="help">{tasks.length} {tasks.length === 1 ? "atividade" : "atividades"} · prazos mais próximos primeiro</p>
          </div>
          <div className="task-list">
            {sortedTasks.map((task) => {
              const dueDate = task.meta.split(" · ")[0];
              const urgent = dueDate === "Hoje" || dueDate === "Amanhã";
              return (
              <article className={`task-card ${urgent ? "urgent" : ""}`} key={task.id}>
                <button className="complete-task" aria-label={`Concluir ${task.title}`} onClick={() => setTaskToConfirm(task)}>
                  <Icon name={urgent ? "2f3a2" : "2d296"} />
                </button>
                <button className="task-card-content" onClick={() => setTaskToConfirm(task)}>
                  {urgent && <small><Icon name="16739" /> {dueDate.toUpperCase()}</small>}
                  <span className="priority-label">Prioridade {task.priority}</span>
                  <strong>{task.title}</strong>
                  {task.subtasks.length > 0 && (
                    <span className="task-subtasks">
                      {task.subtasks.map((subtask, index) => <span key={`${subtask}-${index}`}>• {subtask}</span>)}
                    </span>
                  )}
                  <em>{task.meta}</em>
                </button>
              </article>
            )})}
          </div>
          <aside className="start-card">
            <div><Icon name="b93d0" /><strong>Dificuldade por onde começar?</strong></div>
            <p>Toque aqui para quebrar sua tarefa em pequenos passos.</p>
            <button onClick={() => setSnackbar({ message: "Função ainda não implementada neste protótipo", tone: "danger" })}>
              Dividir em pequenos passos <Icon name="42344" />
            </button>
          </aside>
        </div>
      </div>
      <footer className="home-footer">
        <div className="content-width add-row">
          <button className="new-task" onClick={startNewTask}><Icon name="57415" />Nova tarefa</button>
        </div>
        <nav className="bottom-nav content-width" aria-label="Navegação principal">
          {[
            ["0044b", "Início"],
            ["f036e", "Atividades"],
            ["d54a8", "Estatísticas"],
            ["46301", "Perfil"],
          ].map(([icon, label], index) => (
            <button className={index === 0 ? "active" : ""} key={label}>
              <Icon name={icon} /><span>{label}</span>
            </button>
          ))}
        </nav>
      </footer>
      {taskToConfirm && (
        <div className="dialog-backdrop" role="presentation" onMouseDown={() => setTaskToConfirm(null)}>
          <section
            className="confirmation-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="confirmation-icon"><Icon name="8c9b3" /></div>
            <h2 id="confirmation-title">Concluir tarefa?</h2>
            <p>Confirme para retirar “{taskToConfirm.title}” da sua lista de atividades.</p>
            <div className="confirmation-actions">
              <button className="secondary-button" onClick={() => setTaskToConfirm(null)}>Cancelar</button>
              <button className="primary-button" onClick={confirmCompletion}>Concluir tarefa</button>
            </div>
            <button
              className="text-link"
              onClick={() => {
                const selectedTask = taskToConfirm;
                setTaskToConfirm(null);
                openTask(selectedTask);
              }}
            >
              Editar tarefa
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

function Chip({
  children,
  selected = false,
  icon,
  onClick,
}: {
  children: React.ReactNode;
  selected?: boolean;
  icon?: string;
  onClick?: () => void;
}) {
  return (
    <button className={`chip ${selected ? "selected" : ""}`} onClick={onClick}>
      {selected && <Icon name="dd7f5" />}
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

function TaskHeader({ go }: { go: (screen: Screen) => void }) {
  return (
    <header className="task-header content-width">
      <button className="icon-button" aria-label="Fechar" onClick={() => go("home")}><Icon name="2fff4" /></button>
      <h1>Nova Tarefa</h1>
      <span className="header-spacer" aria-hidden="true" />
    </header>
  );
}

function TaskScreen({
  go,
  detailed,
  initialTask,
  saveTask,
}: {
  go: (screen: Screen) => void;
  detailed: boolean;
  initialTask: TaskItem | null;
  saveTask: (task: Omit<TaskItem, "id">) => void;
}) {
  const initialSubject = initialTask?.meta.split(" · ")[1] || "Matemática";
  const initialDate = initialTask?.meta.split(" · ")[0] || "Hoje";
  const [description, setDescription] = useState(initialTask?.title || "");
  const [date, setDate] = useState(initialDate);
  const [subject, setSubject] = useState(initialSubject);
  const [priority, setPriority] = useState<Priority>(initialTask?.priority || "Média");
  const [subtasks, setSubtasks] = useState<string[]>(initialTask?.subtasks || []);
  const [customSubjects, setCustomSubjects] = useState<string[]>(
    ["Matemática", "Ciências", "História"].includes(initialSubject) ? [] : [initialSubject],
  );
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  const handleSave = () => {
    saveTask({
      title: description.trim() || "Nova tarefa",
      meta: `${date} · ${subject}`,
      priority,
      subtasks,
    });
  };

  const saveSubject = () => {
    const value = newSubject.trim();
    if (!value) return;
    setCustomSubjects((items) => items.includes(value) ? items : [...items, value]);
    setSubject(value);
    setNewSubject("");
    setShowSubjectForm(false);
  };

  return (
    <main className="screen white">
      <TaskHeader go={go} />
      <div className="scroll-area">
        <div className="task-form content-width">
          <section className="form-group">
            <div className="field-heading">
              <h2>O que você precisa entregar?</h2>
              <span className="character-count">{description.length}/40</span>
            </div>
            <textarea
              aria-label="Descrição da tarefa"
              placeholder="Ex: Prova de História sexta-feira"
              maxLength={40}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <p className="help">Escreva o básico. Os detalhes ficam para depois.</p>
          </section>
          <section className="form-group">
            <h2>Para quando?</h2>
            <div className="chip-row">
              <Chip selected={date === "Hoje"} onClick={() => setDate("Hoje")}>Hoje</Chip>
              <Chip selected={date === "Amanhã"} onClick={() => setDate("Amanhã")}>Amanhã</Chip>
            </div>
            <div className="chip-row">
              <Chip
                selected={date === "Sexta-feira, 13 nov."}
                icon={date === "Sexta-feira, 13 nov." ? "1a9ba" : "4da63"}
                onClick={() => setDate("Sexta-feira, 13 nov.")}
              >
                {date === "Sexta-feira, 13 nov." ? "Sexta-feira, 13 nov." : "Escolher no calendário"}
              </Chip>
            </div>
          </section>
          <section className="form-group">
            <h2>Qual matéria?</h2>
            <div className="chip-row wrap">
              {["Matemática", "Ciências", "História", ...customSubjects].map((item) => (
                <Chip key={item} selected={subject === item} onClick={() => setSubject(item)}>{item}</Chip>
              ))}
              <Chip icon="64ef1" onClick={() => setShowSubjectForm(true)}>Nova</Chip>
            </div>
            {showSubjectForm && (
              <div className="subtask-editor">
                <div className="field-heading">
                  <label htmlFor="new-subject">Nome da nova matéria</label>
                  <span className="character-count">{newSubject.length}/40</span>
                </div>
                <input
                  id="new-subject"
                  maxLength={40}
                  placeholder="Ex: Geografia"
                  value={newSubject}
                  onChange={(event) => setNewSubject(event.target.value)}
                  autoFocus
                />
                <div className="editor-actions">
                  <button className="secondary-button" onClick={() => setShowSubjectForm(false)}>Cancelar</button>
                  <button className="primary-button compact" onClick={saveSubject} disabled={!newSubject.trim()}>Salvar matéria</button>
                </div>
              </div>
            )}
          </section>
          <section className="details-section">
            <button className="details-toggle" onClick={() => go(detailed ? "task" : "details")}>
              <span>{detailed ? "Detalhes e subtarefas" : "Adicionar detalhes e subtarefas"}</span>
              <Icon name={detailed ? "11b85" : "538ae"} />
            </button>
            {detailed ? (
              <AdvancedFields
                priority={priority}
                setPriority={setPriority}
                subtasks={subtasks}
                setSubtasks={setSubtasks}
              />
            ) : (
              <aside className="tip-card">
                <strong>Só o essencial para começar</strong>
                <p>Anexos, links, prioridade e lembretes aparecem apenas se você precisar.</p>
              </aside>
            )}
          </section>
        </div>
      </div>
      <footer className="task-footer content-width">
        <PrimaryButton onClick={handleSave}><Icon name="8c9b3" />{initialTask ? "Salvar Tarefa" : "Criar Tarefa"}</PrimaryButton>
      </footer>
    </main>
  );
}

function AdvancedFields({
  priority,
  setPriority,
  subtasks,
  setSubtasks,
}: {
  priority: Priority;
  setPriority: (priority: Priority) => void;
  subtasks: string[];
  setSubtasks: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [attachment, setAttachment] = useState(false);
  const [link, setLink] = useState(false);
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [subtaskText, setSubtaskText] = useState("");
  const [reminders, setReminders] = useState([
    { id: 1, text: "1 dia antes · às 18:00" },
  ]);

  const addReminder = () => {
    const id = Date.now();
    setReminders((items) => [...items, { id, text: `${items.length + 1} dias antes · às 18:00` }]);
  };

  const saveSubtask = () => {
    const text = subtaskText.trim();
    if (!text) return;
    setSubtasks((items) => [...items, text]);
    setSubtaskText("");
    setShowSubtaskForm(false);
  };

  return (
    <div className="advanced">
      <div className="advanced-group">
        <span>Subtarefas</span>
        <button className="outline-action" onClick={() => setShowSubtaskForm(true)}>
          <Icon name="4ed63" />Adicionar um pequeno passo
        </button>
        {showSubtaskForm && (
          <div className="subtask-editor">
            <div className="field-heading">
              <label htmlFor="subtask">Descreva o pequeno passo</label>
              <span className="character-count">{subtaskText.length}/40</span>
            </div>
            <input
              id="subtask"
              maxLength={40}
              placeholder="Ex: Revisar o capítulo 3"
              value={subtaskText}
              onChange={(event) => setSubtaskText(event.target.value)}
              autoFocus
            />
            <div className="editor-actions">
              <button className="secondary-button" onClick={() => setShowSubtaskForm(false)}>Cancelar</button>
              <button className="primary-button compact" onClick={saveSubtask} disabled={!subtaskText.trim()}>Salvar subtarefa</button>
            </div>
          </div>
        )}
        {subtasks.map((subtask, index) => (
          <div className="saved-subtask" key={`${subtask}-${index}`}>
            <Icon name="8c9b3" /><span>{subtask}</span>
            <button aria-label={`Remover subtarefa ${subtask}`} onClick={() => setSubtasks((items) => items.filter((_, itemIndex) => itemIndex !== index))}>
              <Icon name="6cdbd" />
            </button>
          </div>
        ))}
      </div>
      <div className="advanced-group">
        <span>Prioridade</span>
        <div className="chip-row">
          {(["Baixa", "Média", "Alta"] as Priority[]).map((item) => (
            <Chip key={item} selected={priority === item} onClick={() => setPriority(item)}>{item}</Chip>
          ))}
        </div>
      </div>
      <div className="chip-row wrap">
        <Chip icon="1c194" selected={attachment} onClick={() => setAttachment((value) => !value)}>Anexar arquivo</Chip>
        <Chip icon="74f2d" selected={link} onClick={() => setLink((value) => !value)}>Adicionar link</Chip>
      </div>
      <div className="advanced-group">
        <span>Lembretes</span>
        {reminders.map((reminder) => (
          <div className="reminder" key={reminder.id}>
            <Icon name="dfa0a" />
            <span>{reminder.text}</span>
            <button aria-label="Remover lembrete" onClick={() => setReminders((items) => items.filter((item) => item.id !== reminder.id))}>
              <Icon name="6cdbd" />
            </button>
          </div>
        ))}
        <button className="text-link align-left" onClick={addReminder}>+ Adicionar novo lembrete</button>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("signup");
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);

  const go = (nextScreen: Screen) => {
    setScreen(nextScreen);
  };

  const startNewTask = () => {
    setEditingTask(null);
    setScreen("task");
  };

  const openTask = (task: TaskItem) => {
    setEditingTask(task);
    setScreen("details");
  };

  const resetApp = () => {
    setName("");
    setTasks(initialTasks);
    setEditingTask(null);
    setScreen("signup");
  };

  const saveTask = (task: Omit<TaskItem, "id">) => {
    if (editingTask) {
      setTasks((items) => items.map((item) => item.id === editingTask.id ? { ...item, ...task } : item));
    } else {
      setTasks((items) => [...items, { id: Date.now(), ...task }]);
    }
    setEditingTask(null);
    setScreen("home");
  };

  if (screen === "signup") return <Signup go={go} name={name} setName={setName} />;
  if (screen === "home") {
    return (
      <Home
        go={go}
        name={name}
        tasks={tasks}
        openTask={openTask}
        startNewTask={startNewTask}
        resetApp={resetApp}
        completeTask={(id) => setTasks((items) => items.filter((task) => task.id !== id))}
      />
    );
  }
  return <TaskScreen go={go} detailed={screen === "details"} initialTask={editingTask} saveTask={saveTask} />;
}
