import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import './SearchEnsInput.css';

interface UserCardProps {
  onSearchedInput: (user: string) => void;
}

const SearchEnsInput: FC<UserCardProps> = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const { onSearchedInput } = props;

  const handleSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(ev.target.value);
  };

  const handleSubmitSearch = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    onSearchedInput(searchInput);
  };

  return (
    <>      
      <div className="flex-row-center search-mt-20">
        <form onSubmit={handleSubmitSearch}>
          <div className="flex">
            <input
              className="input"
              type="input"
              id="searchbox"
              placeholder="Search a user by ENS (try vitalik.eth)"
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchEnsInput;
