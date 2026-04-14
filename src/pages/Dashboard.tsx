import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Pencil, 
  LogOut, 
  ExternalLink, 
  Image as ImageIcon, 
  Users, 
  Database,
  Settings as SettingsIcon,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Save,
  Globe,
  Twitter,
  Instagram,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";

type Tab = "portfolio" | "testimonials" | "clients" | "settings";

const GENRES = ["Gaming", "Vlog", "Horror", "Sports", "Challenge", "Business"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("portfolio");
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-foreground flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl flex flex-col z-20">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => window.location.href = "/"}>
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,245,255,1)]" />
            </div>
            <span className="font-display text-lg tracking-widest uppercase">Muhee Admin</span>
          </div>

          <nav className="space-y-2">
            <NavItem 
              active={activeTab === "portfolio"} 
              onClick={() => setActiveTab("portfolio")}
              icon={<ImageIcon size={18} />}
              label="Portfolio"
            />
            <NavItem 
              active={activeTab === "testimonials"} 
              onClick={() => setActiveTab("testimonials")}
              icon={<Users size={18} />}
              label="Testimonials"
            />
            <NavItem 
              active={activeTab === "clients"} 
              onClick={() => setActiveTab("clients")}
              icon={<Database size={18} />}
              label="Clients"
            />
            <NavItem 
              active={activeTab === "settings"} 
              onClick={() => setActiveTab("settings")}
              icon={<SettingsIcon size={18} />}
              label="Settings"
            />
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-muted-foreground hover:text-destructive transition-colors text-xs font-bold uppercase tracking-widest px-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar">
        <header className="sticky top-0 z-10 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 p-8 flex justify-between items-center">
          <h2 className="text-3xl font-display uppercase tracking-widest text-foreground">
            {activeTab === "testimonials" ? "Testimonials" : activeTab} <span className="text-primary/50 text-sm">/ Control Center</span>
          </h2>
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-widest rounded-full h-10 px-6 gap-2"
            onClick={() => window.open("/", "_blank")}
          >
            <ExternalLink size={14} /> View Live Site
          </Button>
        </header>

        <div className="p-10 max-w-6xl">
          {activeTab === "portfolio" && <PortfolioManager />}
          {activeTab === "testimonials" && <TestimonialsManager />}
          {activeTab === "clients" && <ClientsManager />}
          {activeTab === "settings" && <SettingsManager />}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-xs font-bold uppercase tracking-[0.15em] ${
      active 
        ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(0,245,255,0.1)]" 
        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
    }`}
  >
    {icon} {label}
  </button>
);

/* --- PORFOLIO MANAGER --- */
const PortfolioManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [views, setViews] = useState("");
  const [showViews, setShowViews] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from("portfolio_items").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setTitle(item.title);
    setGenre(item.genre);
    setViews(item.views || "");
    setShowViews(!!item.views);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openNewModal = () => {
    setEditingItem(null);
    setTitle("");
    setGenre(GENRES[0]);
    setViews("");
    setShowViews(true);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    let imageUrl = editingItem?.image_url || "";

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, imageFile);

      if (uploadError) {
        toast({ variant: "destructive", title: "Upload Failed", description: uploadError.message });
        setIsSaving(false);
        return;
      }
      
      const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(fileName);
      imageUrl = publicUrl;
    }

    const payload = {
      title,
      genre,
      views: showViews ? views : null,
      image_url: imageUrl,
    };

    const { error } = editingItem 
      ? await supabase.from("portfolio_items").update(payload).eq("id", editingItem.id)
      : await supabase.from("portfolio_items").insert([payload]);

    if (error) {
      toast({ variant: "destructive", title: "Save Failed", description: error.message });
    } else {
      toast({ title: "Success", description: editingItem ? "Asset updated." : "New asset launched." });
      setIsModalOpen(false);
      fetchItems();
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This action is irreversible.")) return;
    await supabase.from("portfolio_items").delete().eq("id", id);
    fetchItems();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
          <div>
              <h3 className="text-xl font-display uppercase tracking-widest text-primary/80">Active Assets</h3>
              <p className="text-muted-foreground text-xs mt-1">Manage thumbnails currently live on the edge.</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <Button 
                onClick={openNewModal}
                className="bg-primary text-black font-black uppercase tracking-widest text-[10px] h-11 px-8 rounded-full shadow-[0_0_20px_rgba(0,245,255,0.3)]"
              >
                  <Plus size={16} className="mr-2" /> Launch New Asset
              </Button>
              <DialogContent className="glass-card border-white/10 bg-[#0a0a0a]/95 text-foreground">
                  <DialogHeader>
                      <DialogTitle className="font-display uppercase tracking-widest">Asset Parameters</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSave} className="space-y-6 pt-4">
                      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="bg-black/40 border-white/10" />
                      <div className="grid grid-cols-2 gap-4">
                          <Select value={genre} onValueChange={setGenre}>
                              <SelectTrigger className="bg-black/40 border-white/10"><SelectValue /></SelectTrigger>
                              <SelectContent className="bg-[#0a0a0a] border-white/10 text-foreground">
                                  {GENRES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                              </SelectContent>
                          </Select>
                          <div className="space-y-4">
                              <div className="flex items-center space-x-2">
                                  <input 
                                    type="checkbox" 
                                    id="showViews"
                                    checked={showViews} 
                                    onChange={(e) => setShowViews(e.target.checked)}
                                    className="w-4 h-4 rounded border-white/10 bg-black/40 text-primary focus:ring-primary"
                                  />
                                  <label htmlFor="showViews" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground cursor-pointer">Display Views</label>
                              </div>
                              <Input 
                                value={views} 
                                onChange={(e) => setViews(e.target.value)} 
                                placeholder="e.g. 1.2M" 
                                disabled={!showViews}
                                required={showViews}
                                className={`bg-black/40 border-white/10 transition-opacity ${!showViews ? 'opacity-30' : 'opacity-100'}`} 
                              />
                          </div>
                      </div>
                      <Input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="bg-black/40 border-white/10 file:text-primary file:font-bold file:uppercase file:text-[10px]" />
                      <Button type="submit" disabled={isSaving} className="w-full bg-primary text-black font-black uppercase tracking-widest">
                          {isSaving ? "Encrypting..." : "Commit Asset to Edge"}
                      </Button>
                  </form>
              </DialogContent>
          </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-2xl overflow-hidden group border-white/5 hover:border-primary/30 transition-all">
             <div className="aspect-video relative">
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                {item.views && (
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase font-bold text-primary">
                        {item.views} Views
                    </div>
                )}
             </div>
              <div className="p-5 flex justify-between items-center">
                 <h4 className="font-display text-lg uppercase truncate max-w-[150px]">{item.title}</h4>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Edit asset"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Delete asset"
                    >
                      <Trash2 size={16} />
                    </button>
                 </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- TESTIMONIALS MANAGER --- */
const TestimonialsManager = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const { toast } = useToast();

    const [name, setName] = useState("");
    const [quote, setQuote] = useState("");
    const [size, setSize] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
        setItems(data || []);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const payload = { name, quote, size };

        const { error } = editingItem 
            ? await supabase.from("testimonials").update(payload).eq("id", editingItem.id)
            : await supabase.from("testimonials").insert([payload]);

        if (error) {
            toast({ variant: "destructive", title: "Save Failed", description: error.message });
        } else {
            toast({ title: "Success", description: editingItem ? "Creator updated." : "New creator committed." });
            setIsModalOpen(false);
            fetchItems();
        }
        setIsSaving(false);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setName(item.name);
        setQuote(item.quote);
        setSize(item.size);
        setIsModalOpen(true);
    };

    const openNewModal = () => {
        setEditingItem(null);
        setName("");
        setQuote("");
        setSize("");
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This action is irreversible.")) return;
        await supabase.from("testimonials").delete().eq("id", id);
        fetchItems();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-display uppercase tracking-widest text-primary/80">Creator Roster</h3>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <Button 
                        onClick={openNewModal}
                        className="bg-primary text-black font-black uppercase tracking-widest text-[10px] h-11 px-8 rounded-full shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                    >
                        <Plus size={16} className="mr-2" /> Launch New Roster Item
                    </Button>
                    <DialogContent className="glass-card border-white/10 bg-[#0a0a0a]/95 text-foreground">
                        <DialogHeader>
                            <DialogTitle className="font-display uppercase tracking-widest">Roster Configuration</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 pt-4">
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Creator Name" required className="bg-black/40 border-white/10" />
                            <Input value={size} onChange={(e) => setSize(e.target.value)} placeholder="Channel Size (e.g. 2.5M Subscribers)" required className="bg-black/40 border-white/10" />
                            <textarea 
                                value={quote} 
                                onChange={(e) => setQuote(e.target.value)} 
                                placeholder="Testimonial Quote" 
                                required 
                                className="w-full h-32 bg-black/40 border border-white/10 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40"
                            />
                            <Button type="submit" disabled={isSaving} className="w-full bg-primary text-black font-black uppercase tracking-widest">
                                {isSaving ? "Syncing..." : "Commit to Roster"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map(t => (
                    <div key={t.id} className="glass-card rounded-2xl p-6 border-white/5 space-y-4 hover:border-primary/20 transition-all group">
                        <p className="text-sm text-muted-foreground italic leading-relaxed">"{t.quote}"</p>
                        <div className="flex justify-between items-end">
                            <div>
                                <h5 className="font-bold text-foreground">{t.name}</h5>
                                <p className="text-[10px] uppercase tracking-widest text-primary">{t.size}</p>
                            </div>
                            <div className="flex gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => handleEdit(t)} 
                                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                    aria-label="Edit creator"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(t.id)} 
                                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                    aria-label="Delete creator"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {!loading && items.length === 0 && <p className="text-muted-foreground text-sm">No creators in roster.</p>}
                {loading && <p className="text-muted-foreground text-sm animate-pulse">Scanning database...</p>}
            </div>
        </div>
    );
};

/* --- CLIENTS MANAGER --- */
const ClientsManager = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const { toast } = useToast();

    const [name, setName] = useState("");
    const [subCount, setSubCount] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
        if (error) toast({ variant: "destructive", title: "Fetch Failed" });
        else setItems(data || []);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        let avatarUrl = editingItem?.avatar_url || "";

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, imageFile);

            if (uploadError) {
                toast({ variant: "destructive", title: "Upload Failed", description: uploadError.message });
                setIsSaving(false);
                return;
            }
            
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
            avatarUrl = publicUrl;
        }

        const payload = { name, sub_count: subCount, avatar_url: avatarUrl };

        const { error } = editingItem 
            ? await supabase.from("clients").update(payload).eq("id", editingItem.id)
            : await supabase.from("clients").insert([payload]);

        if (error) {
            toast({ variant: "destructive", title: "Save Failed", description: error.message });
        } else {
            toast({ title: "Success", description: editingItem ? "Client updated." : "New giant committed." });
            setIsModalOpen(false);
            fetchItems();
        }
        setIsSaving(false);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setName(item.name);
        setSubCount(item.sub_count);
        setImageFile(null);
        setIsModalOpen(true);
    };

    const openNewModal = () => {
        setEditingItem(null);
        setName("");
        setSubCount("");
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This giant will be removed from the marquee.")) return;
        await supabase.from("clients").delete().eq("id", id);
        fetchItems();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-display uppercase tracking-widest text-primary/80">Giant Roster</h3>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <Button 
                        onClick={openNewModal}
                        className="bg-primary text-black font-black uppercase tracking-widest text-[10px] h-11 px-8 rounded-full shadow-[0_0_20px_rgba(0,245,255,0.3)]"
                    >
                        <Plus size={16} className="mr-2" /> Launch New Giant
                    </Button>
                    <DialogContent className="glass-card border-white/10 bg-[#0a0a0a]/95 text-foreground">
                        <DialogHeader>
                            <DialogTitle className="font-display uppercase tracking-widest">Giant Specification</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-6 pt-4">
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Creator Name" required className="bg-black/40 border-white/10" />
                            <Input value={subCount} onChange={(e) => setSubCount(e.target.value)} placeholder="Display Subscriber Count (e.g. 10Mandatory)" required className="bg-black/40 border-white/10" />
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Avatar Image (Optional)</label>
                                <Input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="bg-black/40 border-white/10" />
                            </div>
                            <Button type="submit" disabled={isSaving} className="w-full bg-primary text-black font-black uppercase tracking-widest">
                                {isSaving ? "Syncing..." : "Commit To Marquee"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(c => (
                    <div key={c.id} className="glass-card rounded-2xl p-6 border-white/5 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-black/40 border border-white/10">
                                {c.avatar_url ? (
                                    <img src={c.avatar_url} alt={name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-primary/20 bg-primary/5">
                                        <Users size={20} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h5 className="font-bold text-foreground text-sm">{c.name}</h5>
                                <p className="text-[10px] uppercase tracking-widest text-primary/60">{c.sub_count}</p>
                            </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(c)} className="p-2 text-muted-foreground hover:text-primary"><Pencil size={14} /></button>
                            <button onClick={() => handleDelete(c.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* --- SETTINGS MANAGER --- */
const SettingsManager = () => {
    const [settings, setSettings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // Specific states for easier handling
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");
    const [email, setEmail] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => { fetchSettings(); }, []);

    const fetchSettings = async () => {
        const { data } = await supabase.from("settings").select("*");
        if (data) {
            setSettings(data);
            const getVal = (key: string) => data.find(s => s.key === key)?.value || "";
            setTwitter(getVal("twitter_url"));
            setInstagram(getVal("instagram_url"));
            setEmail(getVal("contact_email"));
        }
        setLoading(false);
    };

    const handleUpdate = async (key: string, value: string) => {
        setIsUpdating(true);
        const { error } = await supabase.from("settings").update({ value }).eq("key", key);
        if (error) {
            toast({ variant: "destructive", title: "Update Failed", description: error.message });
        } else {
            toast({ title: "Updated", description: `${key} successfully saved.` });
        }
        setIsUpdating(false);
    };

    const toggleSection = async (key: string, currentVal: string) => {
        const newVal = currentVal === "true" ? "false" : "true";
        await handleUpdate(key, newVal);
        fetchSettings();
    };

    if (loading) return <div className="text-muted-foreground animate-pulse text-sm">Deciphering configuration...</div>;

    return (
        <div className="max-w-2xl space-y-12">
            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <Database size={16} className="text-primary" />
                    <h3 className="text-lg font-display uppercase tracking-widest">Section Visibility</h3>
                </div>
                <div className="grid gap-4">
                    {settings.filter(s => s.key.startsWith("show_")).map(s => (
                        <div key={s.id} className="glass-card p-5 rounded-2xl flex items-center justify-between border-white/5">
                            <div>
                                <h4 className="text-sm font-bold capitalize">{s.key.replace("show_", "").replace("_", " ")}</h4>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Live visibility on landing page</p>
                            </div>
                            <button 
                                onClick={() => toggleSection(s.key, s.value)}
                                className={`w-14 h-7 rounded-full transition-all relative ${s.value === "true" ? 'bg-primary' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${s.value === "true" ? 'left-8' : 'left-1'}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <Globe size={16} className="text-primary" />
                    <h3 className="text-lg font-display uppercase tracking-widest">Social & Contact Links</h3>
                </div>
                <div className="glass-card p-8 rounded-2xl border-white/5 space-y-8">
                    <div className="grid gap-6">
                        <div className="space-y-3">
                             <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] uppercase font-black text-primary tracking-widest">Twitter / X URL</label>
                                <button onClick={() => handleUpdate("twitter_url", twitter)} className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"><Save size={12} className="inline mr-1" /> Save</button>
                             </div>
                             <Input 
                                value={twitter} 
                                onChange={(e) => setTwitter(e.target.value)} 
                                placeholder="https://x.com/..." 
                                className="bg-black/40 border-white/10 h-14 rounded-2xl focus:border-primary/50 transition-all font-mono text-xs" 
                             />
                        </div>
                        <div className="space-y-3">
                             <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] uppercase font-black text-primary tracking-widest">Instagram Profile</label>
                                <button onClick={() => handleUpdate("instagram_url", instagram)} className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"><Save size={12} className="inline mr-1" /> Save</button>
                             </div>
                             <Input 
                                value={instagram} 
                                onChange={(e) => setInstagram(e.target.value)} 
                                placeholder="https://instagram.com/..." 
                                className="bg-black/40 border-white/10 h-14 rounded-2xl focus:border-primary/50 transition-all font-mono text-xs" 
                             />
                        </div>
                        <div className="space-y-3">
                             <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] uppercase font-black text-primary tracking-widest">Public Email Address</label>
                                <button onClick={() => handleUpdate("contact_email", email)} className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"><Save size={12} className="inline mr-1" /> Save</button>
                             </div>
                             <Input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="hello@jwane.design" 
                                className="bg-black/40 border-white/10 h-14 rounded-2xl focus:border-primary/50 transition-all font-mono text-xs" 
                             />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
