export default function Postpage() {
     const pagerender = (currentPage, postperPage, data) => {
        const indexofLastPost = currentPage * postperPage;
        const indexofFirstPost = indexofLastPost - postperPage;
        const currentpost = data.slice(indexofFirstPost, indexofLastPost);
        return currentpost;
    };
    return { pagerender };
}

