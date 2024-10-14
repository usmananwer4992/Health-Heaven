import React from "react";

function Search({ query, results, onSearch, setQuery }) {
  const handleSearchClick = () => {
    onSearch();
  };
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <button
              className="btn btn-primary custom-button btn-block"
              type="button"
              onClick={() => handleSearchClick()}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {results.map((result) => (
        <div key={result.id} className="custom-results">
          {result.name}
        </div>
      ))}
    </>
  );
}

export default Search;
