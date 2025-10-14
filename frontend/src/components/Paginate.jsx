import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ page, pages, isAdmin = false, keyword = '' }) => {
    return (
        pages > 1 && (
            <Pagination className="justify-content-center my-3">
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        // to={x + 1 === 1 ? `/` : isAdmin ? keyword ? `/search/${keyword}/page/` : `/admin/productlist/${x + 1}` : `/page/${x + 1}`}
                        to={!isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}` : `/admin/productlist/${x + 1}`}
                    >
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default Paginate