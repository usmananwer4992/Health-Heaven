import React from "react";
import "./pagination.css"; // Import your custom CSS

function Pagination({ currentPage, totalPages, onPageChange }) {
  // console.log(currentPage, totalPages, onPageChange, "pagination")
  console.log(totalPages <= 1 && !isNaN(totalPages))
  if (totalPages <= 1) {
    // If there's only one page or no pages, don't render the pagination.
    return null;
  }

  const MAX_PAGES_DISPLAYED = 5; // Adjust this value based on your preference

  const getPageItemClass = (pageNumber) =>
    `page-item${currentPage === pageNumber ? " active" : ""}`;

  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Display a subset of pages around the current page
    const startPage = Math.max(
      1,
      currentPage - Math.floor(MAX_PAGES_DISPLAYED / 2)
    );
    const endPage = Math.min(startPage + MAX_PAGES_DISPLAYED - 1, totalPages);

    return pageNumbers
      .filter((pageNumber) => pageNumber >= startPage && pageNumber <= endPage)
      .map((pageNumber) => (
        <li key={pageNumber} className={getPageItemClass(pageNumber)}>
          <button
            className="page-link"
            onClick={() => onPageChange(pageNumber)}  
          >
            {pageNumber}
          </button>
        </li>
      ));
  };

  return (
    <div className="d-flex justify-content-end">
      <nav>
        <ul className="pagination">
          <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="Previous"
            >
              Previous
            </button>
          </li>
          {renderPageNumbers()}
          <li
            className={`page-item${
              currentPage === totalPages ? " disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              aria-label="Next"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
