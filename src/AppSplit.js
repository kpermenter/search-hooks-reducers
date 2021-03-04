import React, { useEffect, useState, useCallback, useReducer } from 'react';
import axios from 'axios';
import useSemiPersistentState from './hooks/useSemiPersistentState'
import storiesReducer from './reducers/reducers'
import SearchForm from './components/Form';
import List from './components/List';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [url, setUrl] = useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = e => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = e => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    e.preventDefault();
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
          <List list={stories.data} onRemoveItem={handleRemoveStory} />
        )}
    </div>
  );
};

export default App;