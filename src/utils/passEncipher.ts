import bcrypt from "bcryptjs";

// 密码加密函数
export default function passEncipher(pass: string) {
  // 将密码与随机盐组合，进行再次加密
  const hashedPassword = bcrypt.hashSync(pass);
  return {
    pass: hashedPassword,
  };
}
