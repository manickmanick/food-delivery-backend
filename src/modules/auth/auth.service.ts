import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../../repositories/user.repository";
import { AppError } from "../../utils/app-error";

export class AuthService {
  private userRepository = new UserRepository();

  async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const existingUser =
      await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError(
        "Email already exists",
        409
      );
    }

    const hashedPassword =
      await bcrypt.hash(data.password, 10);

    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async login(data: {
    email: string;
    password: string;
  }) {
    const user =
      await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError(
        "Invalid email or password",
        401
      );
    }

    const isPasswordValid =
      await bcrypt.compare(
        data.password,
        user.password
      );

    if (!isPasswordValid) {
      throw new AppError(
        "Invalid email or password",
        401
      );
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}