import React, { Suspense } from 'react';
import useSWR, { SWRConfig } from 'swr';

const fetchArticles = async () => {
  const response = await fetch('https://my-app.dev/articles');
  const json = await response.json();

  return json.data;
};

const Articles = () => {
  const { data: articles } = useSWR('@articles', fetchArticles);

  return (
    <ol>
      {articles.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ol>
  );
};

const App = () => {
  return (
    <SWRConfig
      value={{
        suspense: true,
      }}
    >
      <div>
        <h1>List of articles</h1>
        <Suspense fallback={<p>Loading Articles...</p>}>
          <Articles />
        </Suspense>
      </div>
    </SWRConfig>
  );
};

export default App;
