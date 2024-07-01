import PropTypes from "prop-types";

const RoomPaginator = ({ currentPage, totalPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((pageNum) => (
          <li
            key={pageNum}
            className={`page-item ${currentPage === pageNum ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(pageNum)}>
              {pageNum}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

RoomPaginator.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
};
export default RoomPaginator;
