import bcrypt from "bcryptjs";

// 密码加密函数
export default function passEncipher(pass: string) {
  // 使用hash函数进行加密
  const hashedPassword = bcrypt.hashSync(pass);
  return {
    pass: hashedPassword,
  };
}
