import bcrypt from 'bcryptjs'

export const comparePassword = async (oldPassword: string, existingPassword: string) => {
    try {
        const isMatch = await bcrypt.compare(oldPassword, existingPassword)
        console.log("🚀 ~ comparePassword ~ isMatch:", isMatch)

        return isMatch
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw new Error("Password comparison failed");
    }
}