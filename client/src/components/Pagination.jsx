import Button from './Button';

const Pagination = ({ count, next, previous, onPageChange, currentPage = 1, pageSize = 10 }) => {
  const totalPages = Math.ceil(count / pageSize);

  const handlePrevious = () => {
    if (previous) {
      onPageChange(previous);
    }
  };

  const handleNext = () => {
    if (next) {
      onPageChange(next);
    }
  };

  if (count === 0) return null;

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing page {currentPage} of {totalPages} ({count} total)
      </div>
      <div className="pagination-buttons">
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePrevious}
          disabled={!previous}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleNext}
          disabled={!next}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
