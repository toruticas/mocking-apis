import React, { Suspense } from 'react';
import useSWR, { SWRConfig } from 'swr';

const { NODE_ENV } = process.env;
const IS_DEVELOPMENT = NODE_ENV === 'development';

const fetchArticles = async () => {
  let json;
  if (IS_DEVELOPMENT) {
    const module = await import('./articles');
    json = module.default;
  } else {
    const response = await fetch('https://run.mocky.io/v3/ed8bc812-7198-4eb5-b07e-6fcc74de90f5');
    json = await response.json();
  }

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
