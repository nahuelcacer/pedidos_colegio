import React from "react";
import './TableFooterPaginator.css'
import { TableFooter } from "@mui/material";
const TableFooterPaginator = ({ totalPages, currentPage, handlePageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 1;
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

        let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
        let endPage = Math.min(totalPages, currentPage + halfMaxPagesToShow);

        if (currentPage <= halfMaxPagesToShow) {
            endPage = Math.min(totalPages, maxPagesToShow);
        }

        if (currentPage + halfMaxPagesToShow >= totalPages) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div className="pagination" >
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                >
                    {"<<"}
                </button>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </button>
                {renderPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={page === currentPage ? "active" : ""}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {">"}
                </button>
                <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    {">>"}
                </button>
                {/* </div> */}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                Pagina {currentPage} de {totalPages}
            </div>

        </div>


    );
};

export default TableFooterPaginator;
