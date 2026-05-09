import { Request, Response } from 'express';
import { db } from '../../config/db';
import { hashPassword, comparePassword } from '../../shared/utils/hash';
import { generateTokens } from './auth.utils';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    // 1. Check if user exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // 2. Hash password and save
    const hashedPassword = await hashPassword(password);
    const user = await db.user.create({
      data: { email, password: hashedPassword, role }
    });

    res.status(201).json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // 2. Verify password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // 3. Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.role);

    // 4. Store refresh token in DB (for revocation/security)
    await db.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};