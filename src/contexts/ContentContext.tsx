import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SearchButton {
  id: string;
  title: string;
  link: string;
  order: number;
  webResultPage: string;
}

export interface WebResult {
  id: string;
  name: string;
  link: string;
  title: string;
  description: string;
  logoUrl: string;
  isSponsored: boolean;
  webResultPage: string;
  linkId: number;
}

export interface LandingContent {
  title: string;
  description: string;
}

interface ContentContextType {
  landingContent: LandingContent;
  searchButtons: SearchButton[];
  webResults: WebResult[];
  updateLandingContent: (content: LandingContent) => void;
  addSearchButton: (button: Omit<SearchButton, 'id'>) => void;
  updateSearchButton: (id: string, button: Partial<SearchButton>) => void;
  deleteSearchButton: (id: string) => void;
  addWebResult: (result: Omit<WebResult, 'id' | 'linkId'>) => void;
  updateWebResult: (id: string, result: Partial<WebResult>) => void;
  deleteWebResult: (id: string) => void;
  getWebResultsByPage: (page: string) => WebResult[];
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultLandingContent: LandingContent = {
  title: "Smart Loan Solutions for Your Financial Goals",
  description: "Finding the right loan doesn't have to be complicated. SolveLoan helps you compare rates, understand terms, and make informed decisions. Whether you're planning a major purchase, consolidating debt, or managing unexpected expenses, we provide the resources and guidance to help you find the perfect loan solution."
};

const defaultSearchButtons: SearchButton[] = [
  { id: '1', title: 'Personal Loans', link: '/wr=1', order: 1, webResultPage: 'wr=1' },
  { id: '2', title: 'Home Loans', link: '/wr=2', order: 2, webResultPage: 'wr=2' },
  { id: '3', title: 'Auto Loans', link: '/wr=3', order: 3, webResultPage: 'wr=3' },
  { id: '4', title: 'Student Loans', link: '/wr=4', order: 4, webResultPage: 'wr=4' },
  { id: '5', title: 'Business Loans', link: '/wr=5', order: 5, webResultPage: 'wr=5' }
];

const defaultWebResults: WebResult[] = [
  {
    id: '1',
    name: 'LendingTree',
    link: 'https://lendingtree.com',
    title: 'Compare Personal Loan Rates',
    description: 'Get personalized loan offers from multiple lenders with competitive rates',
    logoUrl: 'https://via.placeholder.com/40',
    isSponsored: true,
    webResultPage: 'wr=1',
    linkId: 1
  },
  {
    id: '2',
    name: 'Bankrate',
    link: 'https://bankrate.com',
    title: 'Personal Loan Calculator & Reviews',
    description: 'Find the best personal loans with our comprehensive comparison tools',
    logoUrl: 'https://via.placeholder.com/40',
    isSponsored: false,
    webResultPage: 'wr=1',
    linkId: 2
  }
];

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [landingContent, setLandingContent] = useState<LandingContent>(() => {
    const saved = localStorage.getItem('landingContent');
    return saved ? JSON.parse(saved) : defaultLandingContent;
  });

  const [searchButtons, setSearchButtons] = useState<SearchButton[]>(() => {
    const saved = localStorage.getItem('searchButtons');
    return saved ? JSON.parse(saved) : defaultSearchButtons;
  });

  const [webResults, setWebResults] = useState<WebResult[]>(() => {
    const saved = localStorage.getItem('webResults');
    return saved ? JSON.parse(saved) : defaultWebResults;
  });

  useEffect(() => {
    localStorage.setItem('landingContent', JSON.stringify(landingContent));
  }, [landingContent]);

  useEffect(() => {
    localStorage.setItem('searchButtons', JSON.stringify(searchButtons));
  }, [searchButtons]);

  useEffect(() => {
    localStorage.setItem('webResults', JSON.stringify(webResults));
  }, [webResults]);

  const updateLandingContent = (content: LandingContent) => {
    setLandingContent(content);
  };

  const addSearchButton = (button: Omit<SearchButton, 'id'>) => {
    const newButton = { ...button, id: Date.now().toString() };
    setSearchButtons([...searchButtons, newButton]);
  };

  const updateSearchButton = (id: string, button: Partial<SearchButton>) => {
    setSearchButtons(searchButtons.map(b => b.id === id ? { ...b, ...button } : b));
  };

  const deleteSearchButton = (id: string) => {
    setSearchButtons(searchButtons.filter(b => b.id !== id));
  };

  const addWebResult = (result: Omit<WebResult, 'id' | 'linkId'>) => {
    const maxLinkId = webResults.reduce((max, r) => Math.max(max, r.linkId), 0);
    const newResult = { ...result, id: Date.now().toString(), linkId: maxLinkId + 1 };
    setWebResults([...webResults, newResult]);
  };

  const updateWebResult = (id: string, result: Partial<WebResult>) => {
    setWebResults(webResults.map(r => r.id === id ? { ...r, ...result } : r));
  };

  const deleteWebResult = (id: string) => {
    setWebResults(webResults.filter(r => r.id !== id));
  };

  const getWebResultsByPage = (page: string) => {
    return webResults.filter(r => r.webResultPage === page);
  };

  return (
    <ContentContext.Provider value={{
      landingContent,
      searchButtons,
      webResults,
      updateLandingContent,
      addSearchButton,
      updateSearchButton,
      deleteSearchButton,
      addWebResult,
      updateWebResult,
      deleteWebResult,
      getWebResultsByPage
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};
