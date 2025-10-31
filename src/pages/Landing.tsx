import { useNavigate } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { Search, ChevronRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const { landingContent, searchButtons } = useContent();

  const sortedButtons = [...searchButtons].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">SolveLoan</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {landingContent.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {landingContent.description}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Related categories</h2>
          </div>

          <div className="space-y-3">
            {sortedButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => navigate(button.link)}
                className="w-full group flex items-center justify-between px-6 py-4 bg-card border border-accent/30 rounded-lg hover:border-accent hover:bg-card/80 transition-all duration-200"
              >
                <span className="text-foreground text-left font-medium">{button.title}</span>
                <ChevronRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
