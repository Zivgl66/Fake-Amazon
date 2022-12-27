import { Link } from "react-router-dom";
import "./pagination.component.css";

const PaginationComponent = ({
  postsPerPage,
  totalPosts,
  paginate,
  paginate_Prev,
  paginate_Next,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container_pagination" style={{ marginTop: "30px" }}>
      <ul className="pagination">
        <li className="page-item">
          <div
            className="page-link"
            onClick={() => {
              paginate_Prev();
            }}
          >
            Prev
          </div>
        </li>
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item">
              <div onClick={() => paginate(number)} className="page-link">
                {number}
              </div>
            </li>
          );
        })}
        <li className="page-item">
          <div
            className="page-link"
            onClick={() => {
              paginate_Next();
            }}
          >
            Next
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PaginationComponent;
