export interface Project {
  id: string;
  title: string;
  description: string;
  liveLink: string;
  screenshots: string[];
  createdAt: string;
}

export interface Admin {
  email: string;
  password: string;
  name: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const PROJECTS_KEY = "tv_projects";
const ADMINS_KEY = "tv_admins";
const MESSAGES_KEY = "tv_messages";
const UPLOAD_PASSWORD = "Darshan@2026";

function initAdmins() {
  const existing = localStorage.getItem(ADMINS_KEY);
  if (!existing) {
    const defaultAdmin: Admin[] = [
      { email: "gandhirakshil190@gmail.com", password: "Rakshil@123", name: "Rakshil Gandhi" },
    ];
    localStorage.setItem(ADMINS_KEY, JSON.stringify(defaultAdmin));
  }
}

initAdmins();

export function getProjects(): Project[] {
  return JSON.parse(localStorage.getItem(PROJECTS_KEY) || "[]");
}

export function addProject(project: Omit<Project, "id" | "createdAt">): Project {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  projects.unshift(newProject);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  return newProject;
}

export function deleteProject(id: string) {
  const projects = getProjects().filter((p) => p.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function verifyUploadPassword(password: string): boolean {
  return password === UPLOAD_PASSWORD;
}

export function getAdmins(): Admin[] {
  return JSON.parse(localStorage.getItem(ADMINS_KEY) || "[]");
}

export function addAdmin(admin: Admin) {
  const admins = getAdmins();
  admins.push(admin);
  localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
}

export function removeAdmin(email: string) {
  if (email === "gandhirakshil190@gmail.com") return;
  const admins = getAdmins().filter((a) => a.email !== email);
  localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
}

export function verifyAdmin(email: string, password: string): boolean {
  return getAdmins().some((a) => a.email === email && a.password === password);
}

export function getMessages(): ContactMessage[] {
  return JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
}

export function addMessage(msg: Omit<ContactMessage, "id" | "createdAt" | "read">): ContactMessage {
  const messages = getMessages();
  const newMsg: ContactMessage = {
    ...msg,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  messages.unshift(newMsg);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  return newMsg;
}

export function markMessageRead(id: string) {
  const messages = getMessages().map((m) =>
    m.id === id ? { ...m, read: true } : m
  );
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export function deleteMessage(id: string) {
  const messages = getMessages().filter((m) => m.id !== id);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}
