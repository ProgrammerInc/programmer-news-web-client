import { useQuery, gql } from '@apollo/client';
import React from 'react';
import Head from '../components/head';
import Nav from '../components/nav';

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ArticleData {
  getArticles: Article[];
}

const GET_ARTICLES = gql`
  query GetArticles {
    getArticles {
      id
      title
      description
      image
      link
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery<ArticleData>(GET_ARTICLES);
  return (
    <div className="home">
      <Head title="Home" />
      <Nav />
      <div className="container">
        <h1>Articles</h1>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Description</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.getArticles.map((article) => (
                  <tr key={article.id}>
                    <td>{article.title}</td>
                    <td>
                      <img
                        src={article.image}
                        alt={article.title}
                        height={100}
                        width={100}
                      />
                    </td>
                    <td>{article.description}</td>
                    <td>
                      <a href={article.link} title={article.title}>
                        {article.link}
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <style jsx>{`
        .home {
          width: 100%;
          color: #333;
        }
        .container {
          padding: 0 25px;
        }
      `}</style>
    </div>
  );
};

export default Home;
