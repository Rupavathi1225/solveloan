import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ContentProvider } from "@/contexts/ContentContext";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import WebResult from "./pages/WebResult";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ContentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/wr=1" element={<WebResult />} />
            <Route path="/wr=2" element={<WebResult />} />
            <Route path="/wr=3" element={<WebResult />} />
            <Route path="/wr=4" element={<WebResult />} />
            <Route path="/wr=5" element={<WebResult />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ContentProvider>
  </QueryClientProvider>
);

export default App;
