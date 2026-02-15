import { supabase } from "@/integrations/supabase/client";

// ── Projects ──
export async function getProjectsFromDB() {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function addProjectToDB(project: { title: string; description: string; live_link: string; screenshots: string[] }) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase.from("projects").insert({ ...project, created_by: user?.id ?? null }).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProjectFromDB(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

// ── Contact Messages ──
export async function getMessagesFromDB() {
  const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function addMessageToDB(msg: { name: string; email: string; subject: string; message: string }) {
  const { error } = await supabase.from("contact_messages").insert(msg);
  if (error) throw error;
}

export async function markMessageReadInDB(id: string) {
  const { error } = await supabase.from("contact_messages").update({ read: true }).eq("id", id);
  if (error) throw error;
}

export async function deleteMessageFromDB(id: string) {
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) throw error;
}

// ── Reviews ──
export async function getApprovedReviews(projectId?: string) {
  let query = supabase.from("reviews").select("*").eq("approved", true).order("created_at", { ascending: false });
  if (projectId) query = query.eq("project_id", projectId);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getAllReviews() {
  const { data, error } = await supabase.from("reviews").select("*, projects(title)").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function addReview(review: { project_id: string; reviewer_name: string; reviewer_email: string; rating: number; comment: string }) {
  const { error } = await supabase.from("reviews").insert(review);
  if (error) throw error;
}

export async function approveReview(id: string) {
  const { error } = await supabase.from("reviews").update({ approved: true }).eq("id", id);
  if (error) throw error;
}

export async function deleteReview(id: string) {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw error;
}

// ── Admin Auth ──
export async function loginAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function logoutAdmin() {
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
  return !!data;
}

// ── Manage Admins ──
export async function getAdminProfiles() {
  const { data, error } = await supabase.from("user_roles").select("user_id, role, profiles(name, email)").eq("role", "admin");
  if (error) throw error;
  return data ?? [];
}

export async function removeAdminRole(userId: string) {
  const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
  if (error) throw error;
}

// ── Get all users (admin only) ──
export async function getAllUsers() {
  const { data, error } = await supabase.rpc("get_all_profiles");
  if (error) throw error;
  return data ?? [];
}

// ── Toggle admin role ──
export async function toggleAdminRole(userId: string, makeAdmin: boolean) {
  if (makeAdmin) {
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" as const });
    if (error) throw error;
  } else {
    await removeAdminRole(userId);
  }
}

export async function addAdminUser(email: string, password: string, name: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");
  const response = await supabase.functions.invoke("add-admin", { body: { email, password, name } });
  if (response.error) throw new Error(response.error.message || "Failed to add admin");
  if (response.data?.error) throw new Error(response.data.error);
  return response.data;
}

// ── Upload screenshot to storage ──
export async function uploadScreenshot(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("project-screenshots").upload(fileName, file);
  if (error) throw error;
  const { data } = supabase.storage.from("project-screenshots").getPublicUrl(fileName);
  return data.publicUrl;
}

// ── Upload blog image to storage ──
export async function uploadBlogImage(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("blog-images").upload(fileName, file);
  if (error) throw error;
  const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
  return data.publicUrl;
}

// ── Blog Posts ──
export async function getBlogPosts(publishedOnly = true) {
  let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
  if (publishedOnly) query = query.eq("published", true);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function addBlogPost(post: { title: string; content: string; excerpt: string; image_url: string; published: boolean }) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase.from("blog_posts").insert({ ...post, author_id: user?.id ?? null }).select().single();
  if (error) throw error;
  return data;
}

export async function updateBlogPost(id: string, updates: Partial<{ title: string; content: string; excerpt: string; image_url: string; published: boolean }>) {
  const { error } = await supabase.from("blog_posts").update({ ...updates, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) throw error;
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

// ── FAQs ──
export async function getFAQs(publishedOnly = true) {
  let query = supabase.from("faqs").select("*").order("sort_order", { ascending: true });
  if (publishedOnly) query = query.eq("published", true);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function addFAQ(faq: { question: string; answer: string; sort_order: number }) {
  const { data, error } = await supabase.from("faqs").insert(faq).select().single();
  if (error) throw error;
  return data;
}

export async function updateFAQ(id: string, updates: Partial<{ question: string; answer: string; sort_order: number; published: boolean }>) {
  const { error } = await supabase.from("faqs").update(updates).eq("id", id);
  if (error) throw error;
}

export async function deleteFAQ(id: string) {
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw error;
}
