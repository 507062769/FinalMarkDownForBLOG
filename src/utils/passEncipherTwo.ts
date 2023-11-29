import CryptoJS from "crypto-js";

export default async function passEncipherTwo(
  password: string,
  qq: string,
  salt: string
) {
  // 加第一次盐，使用qq
  const passOne = CryptoJS.SHA512(password + qq).toString();
  // 加第二次盐，使用数据库中的盐
  const pass = CryptoJS.SHA512(passOne + salt).toString();
  console.log("qq:", qq, "-----");
  console.log("password:", password, "-----");
  console.log("passOne:", passOne, "-----");
  console.log("salt:", salt);
  console.log("pass:", pass);

  return pass;
}
