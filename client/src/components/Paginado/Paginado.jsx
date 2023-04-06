import React from "react";
import "./paginado.css"


export default function Paginado({
    videoGamesPerPage,
    allVideoGames,
    currentPage,
    setCurrentPage
  }) {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(allVideoGames / videoGamesPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const maxPage = pageNumbers.length;
    const pagesToShow = 5;
    const halfPagesToShow = Math.floor(pagesToShow / 2);
  
    let startPage, endPage;
  
    if (maxPage <= pagesToShow) {
      // Show all pages if there are less than the maximum number of pages to show
      startPage = 1;
      endPage = maxPage;
    } else if (currentPage <= halfPagesToShow) {
      // Show the first n pages if we are on one of the first pages
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + halfPagesToShow >= maxPage) {
      // Show the last n pages if we are on one of the last pages
      startPage = maxPage - pagesToShow + 1;
      endPage = maxPage;
    } else {
      // Show a range of pages around the current page
      startPage = currentPage - halfPagesToShow;
      endPage = currentPage + halfPagesToShow;
    }
  
    return (
      <nav className="paginador">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link btn-paginado"
              onClick={() => setCurrentPage(currentPage - 1)}
              tabIndex="-1"
              aria-disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>
          {pageNumbers.slice(startPage - 1, endPage).map((number) => (
            <li
              className={`page-item ${number === currentPage ? "active" : ""}`}
              key={number}
            >
              <button
                className="page-link btn-paginado"
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === maxPage ? "disabled" : ""}`}
          >
            <button
              className="page-link btn-paginado"
              onClick={() => setCurrentPage(currentPage + 1)}
              tabIndex="-1"
              aria-disabled={currentPage === maxPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }