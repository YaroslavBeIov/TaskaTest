// utils.js
export function decodeData(encoded, translations) {
    const decoded = encoded.map(item => {
        const decodedItem = {};
        for (const key in item) {
            if (key.endsWith('Id')) {
                const id = item[key];
                decodedItem[key.slice(0, -2)] = translations[id] || id;
            } else {
                decodedItem[key] = item[key];
            }
        }
        return decodedItem;
    });
    return decoded;
}

export function findUniqueIds(encoded) {
    const uniqueIds = new Set();
    encoded.forEach(item => {
        for (const key in item) {
            if (key.endsWith('Id')) {
                uniqueIds.add(item[key]);
            }
        }
    });
    return Array.from(uniqueIds);
}
