import { useNavigate, useLocation } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const WebResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { webResults } = useContent();

  const pageParam = location.pathname.replace('/', '');
  const results = webResults.filter(r => r.webResultPage === pageParam);
  const sponsoredResults = results.filter(r => r.isSponsored);
  const regularResults = results.filter(r => !r.isSponsored);

  const handleLinkClick = (link: string, linkId: number) => {
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/landing')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-primary">SolveLoan</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {sponsoredResults.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">Sponsored Results</h2>
            <div className="space-y-6">
              {sponsoredResults.map((result) => (
                <div key={result.id} className="bg-card/50 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                        {result.logoUrl && result.logoUrl !== 'https://via.placeholder.com/40' ? (
                          <img src={result.logoUrl} alt={result.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs font-bold text-foreground">
                            {result.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-muted-foreground">Sponsored</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                        <span className="text-xs font-medium text-foreground">{result.name}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-accent mb-2 hover:underline cursor-pointer" onClick={() => handleLinkClick(result.link, result.linkId)}>{result.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{result.description}</p>
                      <button
                        onClick={() => handleLinkClick(result.link, result.linkId)}
                        className="text-sm text-accent hover:underline flex items-center gap-1"
                      >
                        solveloan/lid={result.linkId}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <Button
                        onClick={() => handleLinkClick(result.link, result.linkId)}
                        className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground"
                        size="sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {regularResults.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">Web Results</h2>
            <div className="space-y-6">
              {regularResults.map((result) => (
                <div key={result.id} className="py-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                        {result.logoUrl && result.logoUrl !== 'https://via.placeholder.com/40' ? (
                          <img src={result.logoUrl} alt={result.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs font-bold text-foreground">
                            {result.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-accent mb-1 hover:underline cursor-pointer" onClick={() => handleLinkClick(result.link, result.linkId)}>
                        {result.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                      <button
                        onClick={() => handleLinkClick(result.link, result.linkId)}
                        className="text-sm text-accent hover:underline flex items-center gap-1"
                      >
                        solveloan/lid={result.linkId}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No results found for this category.</p>
            <Button
              onClick={() => navigate('/landing')}
              className="mt-4"
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default WebResult;
