import jwt from "jsonwebtoken";

const generateToken = async (id: any) => {
    const token = await jwt.sign({ id }, process.env.JWT_SECRET!);
    return token;
}

export default generateToken;