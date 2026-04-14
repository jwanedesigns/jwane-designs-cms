import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ImageIcon, 
  Users, 
  Settings, 
  Plus, 
  LogOut, 
  Save, 
  Trash2, 
  X,
  Upload,
  Loader2,
  CheckCircle2,
  Database,
  ArrowRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Tab = "portfolio" | "creators" | "settings";

const GENRES = ["Gaming", "Vlog", "Horror", "Sports", "Other"];

// Legacy Data for Migration
const LEGACY_THUMBNAILS = [
  { genre: "Gaming", title: "Victory Royale", views: "1.2M", image_url: "/assets/1.png" },
  { genre: "Gaming", title: "Speedrun King", views: "890K", image_url: "/assets/2.png" },
  { genre: "Gaming", title: "Hidden Secrets", views: "2.1M", image_url: "/assets/3.png" },
  { genre: "Gaming", title: "Pro Strategy", views: "3.5M", image_url: "/assets/4.png" },
  { genre: "Vlog", title: "Adventure Awaits", views: "750K", image_url: "/assets/5.png" },
  { genre: "Vlog", title: "City Lights", views: "1.8M", image_url: "/assets/6.png" },
  { genre: "Horror", title: "Nightmare Fuel", views: "4.2M", image_url: "/assets/7.png" },
  { genre: "Horror", title: "Don't Look Back", views: "2.7M", image_url: "/assets/8.png" },
  { genre: "Sports", title: "Game Winner", views: "1.1M", image_url: "/assets/9.png" },
  { genre: "Sports", title: "Final Buzzer", views: "920K", image_url: "/assets/10.png" },
  { genre: "Vlog", title: "Morning Routine", views: "1.5M", image_url: "/assets/11.png" },
  { genre: "Vlog", title: "Travel Diary", views: "2.3M", image_url: "/assets/12.png" },
  { genre: "Horror", title: "The Basement", views: "3.1M", image_url: "/assets/13.png" },
  { genre: "Horror", title: "Midnight Walk", views: "880K", image_url: "/assets/14.png" },
  { genre: "Gaming", title: "Epic Clutch", views: "1.9M", image_url: "/assets/15.png" },
  { genre: "Gaming", title: "Pro Loadout", views: "2.5M", image_url: "/assets/16.png" },
  { genre: "Vlog", title: "Life Update", views: "1.3M", image_url: "/assets/17.png" },
  { genre: "Vlog", title: "Q&A Session", views: "980K", image_url: "/assets/18.png" },
  { genre: "Horror", title: "Evil Returns", views: "4.7M", image_url: "/assets/19.png" },
];

const LEGACY_TESTIMONIALS = [
  { quote: "Jwane completely transformed my channel's look. CTR went up 40%.", name: "Creator One", size: "2.5M subscribers" },
  { quote: "The best thumbnail designer. Fast turnaround, insane quality.", name: "Creator Two", size: "1.8M subscribers" },
  { quote: "Every thumbnail feels like a movie poster.", name: "Creator Three", size: "950K subscribers" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("portfolio");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setLoading(false);
      if (!user) {
         window.location.href = "/muhee/login";
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/muhee/login";
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-foreground flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col p-6 z-20">
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => window.location.href = "/"}>
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
             <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,245,255,1)]" />
          </div>
          <span className="font-display text-lg tracking-widest uppercase">Muhee Admin</span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem 
            active={activeTab === "portfolio"} 
            onClick={() => setActiveTab("portfolio")}
            icon={<ImageIcon size={18} />}
            label="Portfolio"
          />
          <NavItem 
            active={activeTab === "creators"} 
            onClick={() => setActiveTab("creators")}
            icon={<Users size={18} />}
            label="Creators"
          />
          <NavItem 
            active={activeTab === "settings"} 
            onClick={() => setActiveTab("settings")}
            icon={<Settings size={18} />}
            label="Settings"
          />
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all text-xs font-bold uppercase tracking-widest"
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto custom-scrollbar">
        <header className="sticky top-0 z-10 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 p-8 flex justify-between items-center">
          <h2 className="text-3xl font-display uppercase tracking-widest text-foreground">
            {activeTab} <span className="text-primary/50 text-sm">/ Control Center</span>
          </h2>
          <div className="flex gap-4">
             <Button 
                onClick={() => window.location.href = "/"}
                variant="outline" 
                className="border-white/10 text-xs font-black uppercase tracking-widest rounded-full opacity-60 hover:opacity-100"
             >
                View Live Site
             </Button>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === "portfolio" && <PortfolioManager key="portfolio" />}
            {activeTab === "creators" && <CreatorsManager key="creators" />}
            {activeTab === "settings" && <SettingsManager key="settings" />}
          </AnimatePresence>
        </div>
      </main>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
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

const PortfolioManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Gaming");
  const [views, setViews] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("thumbnails")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast({ variant: "destructive", title: "Error fetching", description: error.message });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    let imageUrl = editingItem?.image_url || "";

    if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data, error: uploadError } = await supabase.storage
            .from('thumbnails')
            .upload(fileName, imageFile);

        if (uploadError) {
            toast({ variant: "destructive", title: "Upload Failed", description: uploadError.message });
            setIsSaving(false);
            return;
        }
        
        const { data: { publicUrl } } = supabase.storage
            .from('thumbnails')
            .getPublicUrl(fileName);
        
        imageUrl = publicUrl;
    }

    const payload = { title, genre, views, image_url: imageUrl };

    const { error } = editingItem 
        ? await supabase.from("thumbnails").update(payload).eq("id", editingItem.id)
        : await supabase.from("thumbnails").insert([payload]);

    if (error) toast({ variant: "destructive", title: "Save Failed" });
    else {
        toast({ title: "Success", description: "Asset updated." });
        setIsModalOpen(false);
        fetchItems();
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await supabase.from("thumbnails").delete().eq("id", id);
    fetchItems();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
          <h3 className="text-xl font-display uppercase tracking-widest text-primary/80">Active Assets</h3>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                  <Button className="bg-primary text-black font-black uppercase tracking-widest text-[10px] h-11 px-8 rounded-full shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                      <Plus size={16} className="mr-2" /> Launch New Asset
                  </Button>
              </DialogTrigger>
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
                          <Input value={views} onChange={(e) => setViews(e.target.value)} placeholder="Views (e.g. 1.2M)" required className="bg-black/40 border-white/10" />
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
                <img src={item.image_url} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase font-bold text-primary">
                    {item.views} Views
                </div>
             </div>
             <div className="p-5 flex justify-between items-center">
                <h4 className="font-display text-lg uppercase truncate max-w-[150px]">{item.title}</h4>
                <div className="flex gap-2">
                   <button onClick={() => handleDelete(item.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CreatorsManager = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
        setItems(data || []);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        await supabase.from("testimonials").delete().eq("id", id);
        fetchItems();
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-display uppercase tracking-widest text-primary/80">Creator Roster</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map(t => (
                    <div key={t.id} className="glass-card rounded-2xl p-6 border-white/5 space-y-4">
                        <p className="text-sm text-muted-foreground italic leading-relaxed">"{t.quote}"</p>
                        <div className="flex justify-between items-end">
                            <div>
                                <h5 className="font-bold text-foreground">{t.name}</h5>
                                <p className="text-[10px] uppercase tracking-widest text-primary">{t.size}</p>
                            </div>
                            <button onClick={() => handleDelete(t.id)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && <p className="text-muted-foreground text-sm">No creators in roster.</p>}
            </div>
        </div>
    );
};

const SettingsManager = () => {
    const { toast } = useToast();
    const [migrating, setMigrating] = useState(false);

    const runMigration = async () => {
        if (!confirm("This will upload all 19+ legacy thumbnails and 3 testimonials to your database. Continue?")) return;
        setMigrating(true);
        
        try {
            // Migrating Thumbnails
            const { error: tError } = await supabase.from("thumbnails").insert(LEGACY_THUMBNAILS);
            if (tError) throw tError;

            // Migrating Testimonials
            const { error: qError } = await supabase.from("testimonials").insert(LEGACY_TESTIMONIALS);
            if (qError) throw qError;

            toast({ title: "Migration Complete", description: "All legacy data has been synced to the edge." });
        } catch (e: any) {
            toast({ variant: "destructive", title: "Migration Failed", description: e.message });
        }
        setMigrating(false);
    };

    return (
        <div className="max-w-4xl space-y-8">
            <div className="glass-card rounded-3xl p-10 border-white/5 space-y-8">
                <div>
                    <h3 className="text-xl font-display uppercase tracking-widest flex items-center gap-3 mb-2">
                        <Database size={18} className="text-primary" /> Migration Hub
                    </h3>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest mb-8">Synchronize legacy hardcoded data with Supabase Cloud</p>
                    
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-center justify-between">
                        <div className="space-y-1">
                            <h4 className="font-bold text-foreground">Legacy Data Sync</h4>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">19 Thumbnails // 3 Testimonials // Site Brand Settings</p>
                        </div>
                        <Button 
                            onClick={runMigration}
                            disabled={migrating}
                            className="bg-primary text-black font-black uppercase text-[10px] tracking-widest px-8 h-12 rounded-xl group"
                        >
                            {migrating ? <Loader2 className="animate-spin" /> : "Initiate One-Click Migration"}
                            <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-6">
                    <h3 className="text-xl font-display uppercase tracking-widest">Brand Perimeter</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest px-1">Discord Webhook</label>
                             <Input type="password" placeholder="Locked" className="bg-black/40 border-white/10 h-12 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-[10px] uppercase font-black text-muted-foreground tracking-widest px-1">Analytics ID</label>
                             <Input placeholder="Locked" className="bg-black/40 border-white/10 h-12 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
