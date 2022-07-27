import bcrypt from "bcrypt";

export const passwordHash = async (password) => {
    password = await bcrypt.hash(password, 5);
    return password;
}

export const passwordCompare = (password, password2) => {
    return bcrypt.compareSync(password, password2);
}