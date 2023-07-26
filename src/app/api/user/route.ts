import { prisma } from "@/interfaces";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const saltRounds = 10;
  const hash = bcrypt.hashSync(data.password, saltRounds);

  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
      },
    });

    const token = jwt.sign({ sub: user.id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "24h",
    });

    return NextResponse.json(
      { name: user.name, email: user.email, token },
      { status: 200 }
    );
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          message: "E-mail já existe.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json(error);
  }
}
