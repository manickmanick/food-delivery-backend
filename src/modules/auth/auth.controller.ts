import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthRequest } from "../../types/auth-request";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const user = await authService.register(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        email: user.email,
      },
    });
  }

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  }

  async me(req: AuthRequest, res: Response) {
    const user = await authService.getCurrentUser(req.user!.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  }
}
