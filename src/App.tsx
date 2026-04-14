import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

// Lazy-loaded routes for performance optimization
const Index = lazy(() => import("./pages/Index.tsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));

// Precision Loader for Suspense boundaries
const PageLoader = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
    <Loader2 className="w-8 h-8 text-primary animate-spin" />
    <span className="font-display text-[10px] uppercase tracking-[0.4em] text-primary/60">Initializing Engine</span>
  </div>
);

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null; // Or a loading spinner

  if (!session) {
    return <Navigate to="/muhee/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Admin Routes */}
            <Route path="/muhee/login" element={<AdminLogin />} />
            <Route 
              path="/muhee" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all redirect to Home to maintain brand flow */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
