export const findAllItems: string = 'SELECT * FROM item WHERE user_id=$1';
export const findOneItem: string = 'SELECT * FROM item WHERE id=$1 AND user_id=$2';
export const createItem: string = `
    INSERT INTO item(
        name,
        price,
        description,
        image,
        user_id
    ) VALUES ($1, $2, $3, $4, $5) RETURNING *;
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
    AND user_id=$6
    RETURNING *;
`;
export const deleteItem: string = `
    DELETE FROM item
    WHERE id=$1 AND user_id=$2;
`;
export const createUser: string = `
    INSERT INTO user_info(
        id,
        username,
        password,
        email
    ) VALUES ($1, $2, $3, $4) RETURNING *;
`;
export const findOneUser: string = 'SELECT * FROM user_info WHERE username=$1';
export const findUserByUsernameEmail: string = 'SELECT * FROM user_info WHERE username=$1 OR email=$2';
export const updateUser: string = `
    UPDATE 
        user_info
    SET
        username=$1,
        password=$2,
        email=$3
    WHERE id=$4
    RETURNING *;
`;
