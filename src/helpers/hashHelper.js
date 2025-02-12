const bcryptjs = require('bcryptjs')

const hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10)
    return await bcryptjs.hash(password, salt)

}

const comparePassword = async (password, hashPassword) => {
    return await bcryptjs.compare(password, hashPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}