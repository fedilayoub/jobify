import bycrypt from "bcryptjs";


export const hashPassword = async (password) => {
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    return hashedPassword;
}