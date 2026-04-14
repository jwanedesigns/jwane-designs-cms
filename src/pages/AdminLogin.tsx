import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: error.message,
      });
      setLoading(false);
      return;
    }

    toast({
      title: "Welcome Back, Muhee",
      description: "Redirecting to Elite Dashboard...",
    });
    navigate("/muhee");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 border-primary/20 shadow-[0_0_50px_rgba(0,245,255,0.1)] relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/30 mb-4 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <Shield className="text-primary" size={32} />
          </div>
          <h1 className="font-display text-2xl text-foreground mb-2 uppercase tracking-widest">Muhee Access</h1>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">Restricted Dashboard Entry</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/40 border-white/10 h-12 pl-4 focus:border-primary/50 transition-all rounded-xl"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/40 border-white/10 h-12 pl-4 focus:border-primary/50 transition-all rounded-xl"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={18} />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_25px_rgba(0,245,255,0.3)] group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                Initiate Secure Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-[10px] text-muted-foreground/60 uppercase tracking-widest">
            JWANE DESIGNS // CMS GATEWAY V1.0
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
