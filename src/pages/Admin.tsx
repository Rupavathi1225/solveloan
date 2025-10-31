import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    landingContent,
    searchButtons,
    webResults,
    updateLandingContent,
    addSearchButton,
    updateSearchButton,
    deleteSearchButton,
    addWebResult,
    updateWebResult,
    deleteWebResult
  } = useContent();

  const [editingLanding, setEditingLanding] = useState(landingContent);
  const [newButton, setNewButton] = useState({ title: '', link: '', order: 1, webResultPage: 'wr=1' });
  const [newResult, setNewResult] = useState({
    name: '',
    link: '',
    title: '',
    description: '',
    logoUrl: '',
    isSponsored: false,
    webResultPage: 'wr=1'
  });

  const handleSaveLanding = () => {
    updateLandingContent(editingLanding);
    toast({ title: "Success", description: "Landing page content updated" });
  };

  const handleAddButton = () => {
    if (!newButton.title) {
      toast({ title: "Error", description: "Button title is required", variant: "destructive" });
      return;
    }
    const link = newButton.webResultPage ? `/${newButton.webResultPage}` : '/webresult';
    addSearchButton({ ...newButton, link });
    setNewButton({ title: '', link: '', order: 1, webResultPage: 'wr=1' });
    toast({ title: "Success", description: "Search button added" });
  };

  const handleAddResult = () => {
    if (!newResult.name || !newResult.link || !newResult.title) {
      toast({ title: "Error", description: "Name, link, and title are required", variant: "destructive" });
      return;
    }
    addWebResult(newResult);
    setNewResult({
      name: '',
      link: '',
      title: '',
      description: '',
      logoUrl: '',
      isSponsored: false,
      webResultPage: 'wr=1'
    });
    toast({ title: "Success", description: "Web result added" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/landing')}
              variant="outline"
              size="sm"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="landing" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="landing">Landing Content</TabsTrigger>
            <TabsTrigger value="buttons">Search Buttons</TabsTrigger>
            <TabsTrigger value="results">Web Results</TabsTrigger>
          </TabsList>

          <TabsContent value="landing">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Edit Landing Page Content</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                  <Input
                    value={editingLanding.title}
                    onChange={(e) => setEditingLanding({ ...editingLanding, title: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <Textarea
                    value={editingLanding.description}
                    onChange={(e) => setEditingLanding({ ...editingLanding, description: e.target.value })}
                    rows={4}
                    className="bg-background border-border"
                  />
                </div>

                <Button
                  onClick={handleSaveLanding}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="buttons">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Manage Search Buttons</h2>

              <div className="mb-8 p-4 bg-background rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4">Add New Button</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Button title</label>
                    <Input
                      placeholder="Enter button title"
                      value={newButton.title}
                      onChange={(e) => setNewButton({ ...newButton, title: e.target.value })}
                      className="bg-card border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Web Result Page</label>
                    <select
                      value={newButton.webResultPage}
                      onChange={(e) => setNewButton({ ...newButton, webResultPage: e.target.value })}
                      className="w-full px-3 py-2 bg-card border border-border rounded-md text-foreground"
                    >
                      <option value="wr=1">wr=1</option>
                      <option value="wr=2">wr=2</option>
                      <option value="wr=3">wr=3</option>
                      <option value="wr=4">wr=4</option>
                      <option value="wr=5">wr=5</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Order Position</label>
                    <Input
                      type="number"
                      min="1"
                      value={newButton.order}
                      onChange={(e) => setNewButton({ ...newButton, order: parseInt(e.target.value) || 1 })}
                      className="bg-card border-border"
                    />
                  </div>
                  <Button
                    onClick={handleAddButton}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Button
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {[...searchButtons].sort((a, b) => a.order - b.order).map((button) => (
                  <div
                    key={button.id}
                    className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{button.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Position: {button.order} | Page: {button.webResultPage}
                      </div>
                    </div>
                    <Button
                      onClick={() => deleteSearchButton(button.id)}
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Manage Web Results</h2>

              <div className="mb-8 p-4 bg-background rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-4">Add New Result</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                      <Input
                        placeholder="e.g., LendingTree"
                        value={newResult.name}
                        onChange={(e) => setNewResult({ ...newResult, name: e.target.value })}
                        className="bg-card border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Link</label>
                      <Input
                        placeholder="https://example.com"
                        value={newResult.link}
                        onChange={(e) => setNewResult({ ...newResult, link: e.target.value })}
                        className="bg-card border-border"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                    <Input
                      placeholder="Result title"
                      value={newResult.title}
                      onChange={(e) => setNewResult({ ...newResult, title: e.target.value })}
                      className="bg-card border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <Textarea
                      placeholder="Result description"
                      value={newResult.description}
                      onChange={(e) => setNewResult({ ...newResult, description: e.target.value })}
                      className="bg-card border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Logo URL</label>
                    <Input
                      placeholder="https://example.com/logo.png (optional)"
                      value={newResult.logoUrl}
                      onChange={(e) => setNewResult({ ...newResult, logoUrl: e.target.value })}
                      className="bg-card border-border"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Web Result Page</label>
                      <select
                        value={newResult.webResultPage}
                        onChange={(e) => setNewResult({ ...newResult, webResultPage: e.target.value })}
                        className="w-full px-3 py-2 bg-card border border-border rounded-md text-foreground"
                      >
                        <option value="wr=1">wr=1</option>
                        <option value="wr=2">wr=2</option>
                        <option value="wr=3">wr=3</option>
                        <option value="wr=4">wr=4</option>
                        <option value="wr=5">wr=5</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newResult.isSponsored}
                          onChange={(e) => setNewResult({ ...newResult, isSponsored: e.target.checked })}
                          className="w-4 h-4 rounded border-border bg-card text-accent focus:ring-accent"
                        />
                        <span className="text-sm font-medium text-foreground">Sponsored</span>
                      </label>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddResult}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Result
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Existing Results</h3>
                {webResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-4 bg-background rounded-lg border border-border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">{result.name}</span>
                          {result.isSponsored && (
                            <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">
                              Sponsored
                            </span>
                          )}
                          <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                            {result.webResultPage}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            lid={result.linkId}
                          </span>
                        </div>
                        <div className="text-sm text-accent mb-1">{result.title}</div>
                        <div className="text-sm text-muted-foreground">{result.description}</div>
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:underline mt-1 inline-block"
                        >
                          {result.link}
                        </a>
                      </div>
                      <Button
                        onClick={() => deleteWebResult(result.id)}
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
