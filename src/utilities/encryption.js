const crypto = require("crypto");

module.exports = function encryptData(name) {

    // const algorithm = "aes-256-cbc";
    // const initVector = crypto.randomBytes(16);
    // // secret key generate 32 bytes of random data
    // const Securitykey = crypto.randomBytes(32);
    // // the cipher function
    // const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    // // input encoding
    // // output encoding
    // let encryptedName = cipher.update(name, "utf-8", "hex");
    // encryptedName += cipher.final("hex");

    let hashedData = crypto.createHash("md5").update(name).digest("hex")
    console.log("Encrypted message: " + hashedData);

    return hashedData
}