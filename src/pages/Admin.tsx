import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  LogIn, LogOut, Upload, Trash2, Users, MessageSquare, Eye, Plus, X,
  FolderOpen, Mail, Clock, Star, Check, Shield, UserPlus, UserCheck, UserX,
  BookOpen, HelpCircle, Edit2
} from "lucide-react";
import {
  loginAdmin, logoutAdmin, getCurrentUser, isAdmin,
  getProjectsFromDB, addProjectToDB, deleteProjectFromDB, uploadScreenshot,
  getMessagesFromDB, markMessageReadInDB, deleteMessageFromDB,
  getAllReviews, approveReview, deleteReview,
  getAdminProfiles, removeAdminRole, addAdminUser,
  getAllUsers, toggleAdminRole,
  getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
  getFAQs, addFAQ, updateFAQ, deleteFAQ,
  uploadBlogImage
} from "@/lib/supabase-store";
import StarRating from "@/components/StarRating";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Tab = "projects" | "upload" | "messages" | "reviews" | "admins" | "users" | "blogs" | "faqs";

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (user && await isAdmin()) {
        setLoggedIn(true);
        setCurrentUserId(user.id);
      }
      setLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_OUT") {
        setLoggedIn(false);
        setCurrentUserId("");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginAdmin(loginForm.email, loginForm.password);
      if (await isAdmin()) {
        const user = await getCurrentUser();
        setLoggedIn(true);
        setCurrentUserId(user?.id ?? "");
        toast.success("Welcome, Admin!");
      } else {
        await logoutAdmin();
        toast.error("You don't have admin privileges");
      }
    } catch {
      toast.error("Invalid credentials");
    }
  };

  if (loading) {
    return (
      <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="pt-24 md:pt-28 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-8 w-full max-w-md neon-border border"
        >
          <div className="flex items-center gap-3 mb-6">
            <LogIn className="w-6 h-6 text-primary" />
            <h1 className="font-display text-xl text-foreground">Admin Login</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Admin email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-accent text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(183_100%_50%/0.4)] transition-all"
            >
              Login
            </button>
          </form>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-accent">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <button
            onClick={async () => {
              try {
                const { lovable } = await import("@/integrations/lovable/index");
                const { error } = await lovable.auth.signInWithOAuth("google", {
                  redirect_uri: window.location.origin,
                });
                if (error) toast.error(error.message || "Google sign-in failed");
              } catch {
                toast.error("Google sign-in failed");
              }
            }}
            className="mt-4 w-full py-3 rounded-lg font-accent text-sm tracking-wider flex items-center justify-center gap-3 border border-border bg-secondary/50 text-foreground hover:bg-secondary/80 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-24 md:pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl md:text-3xl gradient-text">Admin Panel</h1>
          <button
            onClick={async () => { await logoutAdmin(); setLoggedIn(false); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-accent text-destructive border border-destructive/30 hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {([
            { key: "projects" as Tab, label: "Projects", icon: FolderOpen },
            { key: "upload" as Tab, label: "Upload", icon: Upload },
            { key: "messages" as Tab, label: "Messages", icon: MessageSquare },
            { key: "reviews" as Tab, label: "Reviews", icon: Star },
            { key: "blogs" as Tab, label: "Blogs", icon: BookOpen },
            { key: "faqs" as Tab, label: "FAQs", icon: HelpCircle },
            { key: "users" as Tab, label: "Users", icon: Users },
            { key: "admins" as Tab, label: "Admins", icon: Shield },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-accent text-sm tracking-wider transition-all ${
                activeTab === tab.key
                  ? "bg-primary/10 neon-text neon-border border"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "projects" && <ProjectsPanel />}
        {activeTab === "upload" && <UploadPanel />}
        {activeTab === "messages" && <MessagesPanel />}
        {activeTab === "reviews" && <ReviewsPanel />}
        {activeTab === "blogs" && <BlogsPanel />}
        {activeTab === "faqs" && <FAQsPanel />}
        {activeTab === "users" && <UsersPanel currentUserId={currentUserId} />}
        {activeTab === "admins" && <AdminsPanel currentUserId={currentUserId} />}
      </div>
    </main>
  );
};

function ProjectsPanel() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { setProjects(await getProjectsFromDB()); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No projects yet. Upload one!</p>
      ) : (
        projects.map((p) => (
          <div key={p.id} className="glass rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {p.screenshots?.[0] && (
              <img src={p.screenshots[0]} alt="" className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-accent text-foreground font-semibold truncate">{p.title}</h3>
              <p className="text-muted-foreground text-xs truncate">{p.description}</p>
            </div>
            <button
              onClick={async () => {
                try { await deleteProjectFromDB(p.id); toast.success("Deleted"); load(); } catch { toast.error("Failed"); }
              }}
              className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function UploadPanel() {
  const [form, setForm] = useState({ title: "", description: "", liveLink: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...newFiles]);
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => setPreviews(prev => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!form.title.trim()) { toast.error("Title required"); return; }
    setUploading(true);
    try {
      const screenshotUrls = await Promise.all(files.map(f => uploadScreenshot(f)));
      await addProjectToDB({
        title: form.title,
        description: form.description,
        live_link: form.liveLink,
        screenshots: screenshotUrls,
      });
      setForm({ title: "", description: "", liveLink: "" });
      setFiles([]);
      setPreviews([]);
      toast.success("Project uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    }
    setUploading(false);
  };

  return (
    <div className="max-w-2xl mx-auto glass rounded-2xl p-6 md:p-8 neon-border border space-y-5">
      <input
        type="text" placeholder="Project Title" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })} maxLength={100}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all"
      />
      <textarea
        placeholder="Project Description" value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })} maxLength={1000} rows={3}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all resize-none"
      />
      <input
        type="url" placeholder="Live Link (https://...)" value={form.liveLink}
        onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all"
      />
      <div>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-accent border border-primary/50 text-primary hover:bg-primary/10 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Screenshots
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {previews.map((s, i) => (
              <div key={i} className="relative group">
                <img src={s} alt="" className="w-20 h-14 object-cover rounded-lg" />
                <button
                  onClick={() => removeFile(i)}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={handleUpload} disabled={uploading}
        className="w-full py-3 rounded-lg font-accent text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(183_100%_50%/0.4)] disabled:opacity-50 transition-all"
      >
        {uploading ? "Uploading..." : "Upload Project"}
      </button>
    </div>
  );
}

function MessagesPanel() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { setMessages(await getMessagesFromDB()); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No messages yet.</p>
      ) : (
        messages.map((m) => (
          <div key={m.id} className={`glass rounded-xl p-4 ${!m.read ? "neon-border border" : "border border-transparent"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-accent font-semibold text-foreground text-sm">{m.name}</span>
                  {!m.read && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                  <Mail className="w-3 h-3" /> {m.email}
                </p>
                {m.subject && <p className="text-xs text-primary mb-1">{m.subject}</p>}
                <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                  <Clock className="w-3 h-3" /> {new Date(m.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-foreground/80">{m.message}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {!m.read && (
                  <button
                    onClick={async () => { await markMessageReadInDB(m.id); load(); }}
                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="Mark as read"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={async () => {
                    try { await deleteMessageFromDB(m.id); toast.success("Deleted"); load(); } catch { toast.error("Failed"); }
                  }}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function ReviewsPanel() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { setReviews(await getAllReviews()); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div key={r.id} className={`glass rounded-xl p-4 ${!r.approved ? "border border-yellow-500/30" : "border border-transparent"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-accent font-semibold text-foreground text-sm">{r.reviewer_name}</span>
                  <StarRating rating={r.rating} />
                  {!r.approved && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-accent">Pending</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  on <span className="text-primary">{r.projects?.title || "Unknown Project"}</span>
                </p>
                <p className="text-xs text-muted-foreground mb-2">{r.reviewer_email} · {new Date(r.created_at).toLocaleDateString()}</p>
                {r.comment && <p className="text-sm text-foreground/80">{r.comment}</p>}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {!r.approved && (
                  <button
                    onClick={async () => {
                      try { await approveReview(r.id); toast.success("Approved"); load(); } catch { toast.error("Failed"); }
                    }}
                    className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-all" title="Approve"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={async () => {
                    try { await deleteReview(r.id); toast.success("Deleted"); load(); } catch { toast.error("Failed"); }
                  }}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function UsersPanel({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  const MAIN_ADMIN_ID = "34f9a342-4d28-4267-a433-97228e9ef6b7";

  const load = async () => {
    setLoading(true);
    try { setUsers(await getAllUsers()); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleToggle = async (userId: string, currentlyAdmin: boolean) => {
    if (userId === MAIN_ADMIN_ID) { toast.error("Cannot change main admin"); return; }
    setToggling(userId);
    try {
      await toggleAdminRole(userId, !currentlyAdmin);
      toast.success(currentlyAdmin ? "Admin removed" : "Admin granted");
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed");
    }
    setToggling(null);
  };

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg text-foreground">All Users ({users.length})</h3>
      </div>
      {users.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No users found.</p>
      ) : (
        users.map((u) => (
          <div key={u.user_id} className="glass rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${u.is_admin ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                {(u.name || u.email || "?")[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-accent font-semibold text-foreground text-sm">{u.name || "No name"}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {u.is_admin && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-accent">Admin</span>
              )}
              {u.user_id !== MAIN_ADMIN_ID && currentUserId === MAIN_ADMIN_ID && (
                <button
                  onClick={() => handleToggle(u.user_id, u.is_admin)}
                  disabled={toggling === u.user_id}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-accent transition-all disabled:opacity-50 ${
                    u.is_admin
                      ? "text-destructive border border-destructive/30 hover:bg-destructive/10"
                      : "text-primary border border-primary/30 hover:bg-primary/10"
                  }`}
                >
                  {u.is_admin ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                  {u.is_admin ? "Remove Admin" : "Make Admin"}
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function AdminsPanel({ currentUserId }: { currentUserId: string }) {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ name: "", email: "", password: "" });
  const [adding, setAdding] = useState(false);

  const MAIN_ADMIN_ID = "34f9a342-4d28-4267-a433-97228e9ef6b7";

  const load = async () => {
    setLoading(true);
    try { setAdmins(await getAdminProfiles()); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAddAdmin = async () => {
    if (!addForm.name.trim() || !addForm.email.trim() || !addForm.password.trim()) {
      toast.error("All fields are required");
      return;
    }
    if (addForm.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setAdding(true);
    try {
      await addAdminUser(addForm.email, addForm.password, addForm.name);
      toast.success("Admin added successfully!");
      setAddForm({ name: "", email: "", password: "" });
      setShowAddForm(false);
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to add admin");
    }
    setAdding(false);
  };

  if (loading) return <div className="text-center py-12 text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="font-display text-lg text-foreground">Admin Users</h3>
        </div>
        {currentUserId === MAIN_ADMIN_ID && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-accent border border-primary/50 text-primary hover:bg-primary/10 transition-all"
          >
            {showAddForm ? <X className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            {showAddForm ? "Cancel" : "Add Admin"}
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="glass rounded-2xl p-6 neon-border border space-y-4">
          <h4 className="font-accent text-foreground text-sm font-semibold">Create New Admin</h4>
          <input
            type="text" placeholder="Full Name" value={addForm.name}
            onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all"
          />
          <input
            type="email" placeholder="Email Address" value={addForm.email}
            onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all"
          />
          <input
            type="password" placeholder="Password (min 6 chars)" value={addForm.password}
            onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all"
          />
          <button
            onClick={handleAddAdmin} disabled={adding}
            className="w-full py-3 rounded-lg font-accent text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(183_100%_50%/0.4)] disabled:opacity-50 transition-all"
          >
            {adding ? "Creating..." : "Create Admin"}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {admins.map((a) => {
          const profile = Array.isArray(a.profiles) ? a.profiles[0] : a.profiles;
          return (
            <div key={a.user_id} className="glass rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-accent font-semibold text-foreground text-sm">{profile?.name || "Admin"}</p>
                <p className="text-xs text-muted-foreground">{profile?.email || a.user_id}</p>
                {a.user_id === MAIN_ADMIN_ID && (
                  <span className="text-[10px] text-primary font-accent">Main Admin</span>
                )}
              </div>
              {a.user_id !== MAIN_ADMIN_ID && currentUserId === MAIN_ADMIN_ID && (
                <button
                  onClick={async () => {
                    try { await removeAdminRole(a.user_id); toast.success("Removed"); load(); } catch { toast.error("Failed"); }
                  }}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BlogsPanel() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", excerpt: "", published: false });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try { setPosts(await getBlogPosts(false)); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async () => {
    if (!form.title.trim()) { toast.error("Title required"); return; }
    setUploading(true);
    try {
      let image_url = "";
      if (imageFile) {
        image_url = await uploadBlogImage(imageFile);
      }
      await addBlogPost({ ...form, image_url });
      setForm({ title: "", content: "", excerpt: "", published: false });
      setImageFile(null);
      setImagePreview("");
      setShowForm(false);
      toast.success("Blog post added!");
      load();
    } catch { toast.error("Failed"); }
    setUploading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-foreground">Blog Posts ({posts.length})</h3>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-accent border border-primary/50 text-primary hover:bg-primary/10 transition-all">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "New Post"}
        </button>
      </div>

      {showForm && (
        <div className="glass rounded-2xl p-6 neon-border border space-y-4">
          <input type="text" placeholder="Post Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all" />
          <input type="text" placeholder="Excerpt (short summary)" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all" />
          <div>
            <button onClick={() => imgRef.current?.click()} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-accent border border-primary/50 text-primary hover:bg-primary/10 transition-all">
              <Upload className="w-4 h-4" /> Upload Cover Image
            </button>
            <input ref={imgRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            {imagePreview && (
              <div className="relative mt-3 inline-block">
                <img src={imagePreview} alt="Preview" className="w-40 h-24 object-cover rounded-lg" />
                <button onClick={() => { setImageFile(null); setImagePreview(""); }} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          <textarea placeholder="Blog content..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all resize-none" />
          <label className="flex items-center gap-2 text-sm text-foreground font-accent">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-primary" />
            Publish immediately
          </label>
          <button onClick={handleAdd} disabled={uploading} className="w-full py-3 rounded-lg font-accent text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(183_100%_50%/0.4)] disabled:opacity-50 transition-all">
            {uploading ? "Uploading..." : "Add Post"}
          </button>
        </div>
      )}

      {loading ? <p className="text-center py-12 text-muted-foreground">Loading...</p> : posts.map((p) => (
        <div key={p.id} className={`glass rounded-xl p-4 flex items-center justify-between ${!p.published ? "border border-yellow-500/30" : "border border-transparent"}`}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-accent font-semibold text-foreground text-sm truncate">{p.title}</h4>
              {!p.published && <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 font-accent">Draft</span>}
            </div>
            <p className="text-xs text-muted-foreground truncate">{p.excerpt || p.content?.slice(0, 80)}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {!p.published && (
              <button onClick={async () => { await updateBlogPost(p.id, { published: true }); toast.success("Published"); load(); }} className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-all" title="Publish">
                <Check className="w-4 h-4" />
              </button>
            )}
            <button onClick={async () => { await deleteBlogPost(p.id); toast.success("Deleted"); load(); }} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function FAQsPanel() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ question: "", answer: "", sort_order: 0 });

  const load = async () => {
    setLoading(true);
    try { setFaqs(await getFAQs(false)); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.question.trim() || !form.answer.trim()) { toast.error("Question and answer required"); return; }
    try {
      await addFAQ(form);
      setForm({ question: "", answer: "", sort_order: faqs.length });
      setShowForm(false);
      toast.success("FAQ added!");
      load();
    } catch { toast.error("Failed"); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-foreground">FAQs ({faqs.length})</h3>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-accent border border-primary/50 text-primary hover:bg-primary/10 transition-all">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add FAQ"}
        </button>
      </div>

      {showForm && (
        <div className="glass rounded-2xl p-6 neon-border border space-y-4">
          <input type="text" placeholder="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all" />
          <textarea placeholder="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all resize-none" />
          <input type="number" placeholder="Sort Order" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-all" />
          <button onClick={handleAdd} className="w-full py-3 rounded-lg font-accent text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(183_100%_50%/0.4)] transition-all">Add FAQ</button>
        </div>
      )}

      {loading ? <p className="text-center py-12 text-muted-foreground">Loading...</p> : faqs.map((f) => (
        <div key={f.id} className="glass rounded-xl p-4 flex items-center justify-between border border-transparent">
          <div className="flex-1 min-w-0">
            <h4 className="font-accent font-semibold text-foreground text-sm">{f.question}</h4>
            <p className="text-xs text-muted-foreground truncate">{f.answer.slice(0, 100)}</p>
          </div>
          <button onClick={async () => { await deleteFAQ(f.id); toast.success("Deleted"); load(); }} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all flex-shrink-0">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
