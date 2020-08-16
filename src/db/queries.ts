export const findAllItems: string = 'SELECT * FROM item';
export const findOneItem: string = 'SELECT * FROM item WHERE id=$1';
export const createItem: string = `
    INSERT INTO item(
        name,
        price,
        description,
        image
    ) VALUES ($1, $2, $3, $4) RETURNING *;
`;
export const updateItem: string = `
    UPDATE 
        item
    SET
        name=$1,
        price=$2,
        description=$3,
        image=$4
    WHERE id=$5
    RETURNING *;
`;
export const deleteItem: string = `
    DELETE FROM item
    WHERE id=$1
`;
