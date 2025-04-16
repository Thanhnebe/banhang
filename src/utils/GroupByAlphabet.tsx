const groupByAlphabet = (data: any[]) => {
    const removePrefix = (name: string) => {
        return name.replace(/^(Thành phố|Tỉnh) /, '')
    };
    return data.reduce((acc, item) => {
        const nameWithoutPrefix = removePrefix(item.name);
        const firstLetter = nameWithoutPrefix.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push({ ...item, name: nameWithoutPrefix });
        return acc;
    }, {});
};

export { groupByAlphabet };