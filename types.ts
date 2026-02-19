
export interface ArticleOutline {
  id: string;
  title: string;
  summary: string;
  category: string;
}

export interface ArticleContent {
  id: string;
  title: string;
  sections: {
    heading: string;
    content: string;
  }[];
  facts: string[];
  conclusion: string;
  imageUrl?: string;
}

export interface EncyclopediaState {
  topic: string;
  outlines: ArticleOutline[];
  selectedArticleId: string | null;
  currentArticleContent: ArticleContent | null;
  loading: boolean;
  generatingArticle: boolean;
  error: string | null;
}
