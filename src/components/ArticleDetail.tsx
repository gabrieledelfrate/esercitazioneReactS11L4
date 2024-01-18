import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Article from '../interfaces/Article';

interface ArticleDetailProps {
  
}

const ArticleDetail: React.FC<ArticleDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Errore nel recupero dei dettagli dell\'articolo:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Caricamento...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.publishedAt}</p>
      <img src={article.imageUrl} alt={article.title} style={{ maxWidth: '100%' }} />
      {/* Aggiungi altre informazioni necessarie */}
    </div>
  );
};

export default ArticleDetail;
