import CryptoJS from "crypto-js";
// const encrypted = CryptoJS.AES.encrypt("HELLO", "secret_KEY").toString();
// const decrypted = CryptoJS.AES.decrypt(encrypted, "secret_KEY").toString(CryptoJS.enc.utf8);
// console.log("enc", encrypted, decrypted)

interface ApiEndpoint {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}
export const requestOptions: ApiEndpoint ={
    method: "POST",
}
export const encryptedResult = (result) =>{
    const SecretKey = useRuntimeConfig().public.SecretKey;
    return CryptoJS.AES.encrypt(JSON.stringify(result), SecretKey).toString()
}