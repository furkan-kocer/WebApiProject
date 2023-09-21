export default function Pagination({ postsPerpage, totalPosts, paginate, currentpage, setCurrentPage }) {
    const pagenumbers = [];
    const totalPages = Math.ceil(totalPosts / postsPerpage);
    let startpage, endpage;
    switch (true) {
        case currentpage <= 2:
            startpage = 1;
            endpage = Math.min(5, totalPages);
            break;
        case currentpage >= totalPages - 1:
            startpage = Math.max(1, totalPages - 4);
            endpage = totalPages;
            break;
        default:
            startpage = currentpage - 2;
            endpage = currentpage + 2;
            break;
    }
    for (let i = startpage; i <= endpage; i++) {
            pagenumbers.push(i);
        }
    function increment() {
        if (currentpage < totalPages) {
            setCurrentPage(prev => prev + 1);
        } 
    }
    function decrement() {
        if (currentpage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }
    const lastindex = totalPages;
    return (
        <nav className="justify-content-center d-flex min-w-300 paginationnav my-4">
            <button className="carousel-controlnext rounded-circle bg-white opacity-1 mx-2"
                type="button" onClick={() => setCurrentPage(1)}>
                <i className="bi bi-chevron-double-left fs-5"></i>
                <span className="visually-hidden">Next</span>
            </button>
            <button className="carousel-controlprev rounded-circle bg-white opacity-1 mx-2"
                type="button" onClick={() => decrement()}>
                <i className="bi bi-chevron-compact-left fs-5"></i>
                <span className="visually-hidden">Previous</span>
            </button>
            <ul className="pagination my-auto">
                {pagenumbers.map(number => (
                    <li key={number} className={number === currentpage ? 'page-item active mx-1' : 'page-item mx-1'}>
                        <a onClick={() => paginate(number)}
                            className='page-link pointer rounded-circle px-3'>
                            {number}
                        </a>
                    </li>
                ))
                }
            </ul> 
            <button className="carousel-controlnext rounded-circle bg-white opacity-1 mx-2"
                type="button" onClick={() => increment()}>
                <i className="bi bi-chevron-compact-right fs-5"></i>
                <span className="visually-hidden">Next</span>
            </button>
            <button className="carousel-controlnext rounded-circle bg-white opacity-1 mx-2"
                type="button" onClick={() => setCurrentPage(lastindex)}>
                <i className="bi bi-chevron-double-right fs-5"></i>
                <span className="visually-hidden">Next</span>
            </button>
        </nav>
    )
}