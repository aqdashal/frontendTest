
export const handleSortData = (sortField, sortOrder, data) => {
    if (sortField) {
        const sorted = [...data].sort((a, b) => {
            if (a[sortField] === null) return 1;
            if (b[sortField] === null) return -1;
            if (a[sortField] === null && b[sortField] === null) return 0;
            return (
                a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                    numeric: true,
                }) * (sortOrder === "asc" ? 1 : -1)
            );
        });

        return sorted;
    }
    return data;
};

export const handleFilterData = (filters = {}, data) => {
    if (Object.keys(filters)?.length) {
        return data.filter(row => {
            return Object.keys(filters).every(accessor => {
                const value = row[accessor]
                const searchValue = filters[accessor]

                if (value && (value == searchValue)) {
                    return true
                }

                if (accessor === 'fromDate') {
                    let value = row['creationTimestamp'];
                    let date = value?.split(" ") && value?.split(" ")[0];
                    if (new Date(date).getTime() >= new Date(searchValue).getTime()) {
                        return true
                    }
                }

                if (accessor === 'toDate') {
                    let value = row['creationTimestamp'];
                    let date = value?.split(" ") && value?.split(" ")[0];
                    if (new Date(date).getTime() <= new Date(searchValue).getTime()) {
                        return true
                    }
                }

                return false
            })
        })
    }

    return data;
}