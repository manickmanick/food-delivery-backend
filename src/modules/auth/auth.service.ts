import bcrypt from "bcrypt";

import { UserRepository }
from "../../repositories/user.repository";

export class AuthService {

  private userRepository =
    new UserRepository();

  async register(data: {
    name: string;
    email: string;
    password: string;
  }) {

    const existingUser =
      await this.userRepository
      .findByEmail(data.email);

    if (existingUser) {
      throw new Error(
        "Email already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10
      );

    return this.userRepository.create({
      ...data,
      password: hashedPassword
    });
  }
}