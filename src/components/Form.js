import React from 'react';
import Input from './Input'

const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
  }) => (
    <form onSubmit={onSearchSubmit}>
      <Input
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={onSearchInput}
      >
        <strong>Search:</strong>
      </Input>
  
      <button type="submit" disabled={!searchTerm}>
        Submit
      </button>
    </form>
  );

  export default SearchForm;