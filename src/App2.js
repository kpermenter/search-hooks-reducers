import List from './components/List';
import InputWithLabel, { getAsyncStories } from './components/InputWithLabel'
import useSemiPersistentState from './hooks/useSemiPersistentState'
import { useState, useEffect } from 'react';

const App = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getAsyncStories().then(result => {
      setStories(result.data.stories);
      setIsLoading(false)
    })
      .catch(() => setIsError(true));
  }, []);

  const handleRemoveStories = (el) => {
    const newStories = stories.filter(
      story => el.objectID !== story.objectID
    )
    setStories(newStories)
  }

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  )

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id='search'
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      {isError && (
        <p>something went wrong</p>
      )}
      {isLoading ? (
        <p>...loading</p>
      ) : (

          <List
            list={searchedStories}
            onRemoveItem={handleRemoveStories} />
        )}
    </div>
  );
};

export default App;