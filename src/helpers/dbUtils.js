const paginate = ({
    page,
    pageSize
}) => {
    if (!page || page == 0) {
        page = 0;
    }
    if (!pageSize || pageSize == 0) {
        pageSize = 50;
    }

    const offset = page * pageSize;
    const limit = pageSize;

    return {
        offset,
        limit,
    };
};

module.exports = {
    paginate
};