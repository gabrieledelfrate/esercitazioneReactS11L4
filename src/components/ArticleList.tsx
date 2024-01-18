import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Article from '../interfaces/Article';

interface ArticleListProps {
  // Proprietà proprie se necessario
}

const ArticleList: React.FC<ArticleListProps> = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Errore nel recupero degli articoli:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Spaceflight News</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <Link to={`/detail/${article.id}`}>
            <h2>{article.title}</h2>
          </Link>
          <p>{article.publishedAt}</p>
          <img src={article.imageUrl} alt={article.title} style={{ maxWidth: '100%' }} />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
