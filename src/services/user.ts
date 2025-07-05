import prisma from "@/lib/prisma"
import { hash, compare } from "bcryptjs"

interface UpdateUserData {
  name?: string
  email?: string
  avatarUrl?: string
  currentPassword?: string
  newPassword?: string
}

interface UserUpdateFields {
  name?: string
  email?: string
  avatarUrl?: string
  passwordHash?: string
}

export async function createUser(data: {
  email: string
  password: string
  name?: string
}) {
  const hashedPassword = await hash(data.password, 10)

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash: hashedPassword,
      name: data.name
    }
  })

  return { id: user.id, email: user.email, name: user.name }
}

export async function updateUser(
  userId: string,
  data: UpdateUserData
) {
  const updateData: UserUpdateFields = {
    name: data.name,
    avatarUrl: data.avatarUrl,
    email: data.email
  }

  // Remove undefined fields
  Object.keys(updateData).forEach(key => {
    if (updateData[key as keyof UserUpdateFields] === undefined) {
      delete updateData[key as keyof UserUpdateFields]
    }
  })

  // Handle password update
  if (data.currentPassword && data.newPassword) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user?.passwordHash) {
      throw new Error("User not found or no password set")
    }

    const passwordValid = await compare(data.currentPassword, user.passwordHash)
    if (!passwordValid) {
      throw new Error("Current password is incorrect")
    }

    updateData.passwordHash = await hash(data.newPassword, 10)
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: updateData
  })

  return { 
    id: user.id, 
    email: user.email, 
    name: user.name,
    avatarUrl: user.avatarUrl 
  }
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id }
  })

  if (!user) {
    throw new Error("User not found")
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl
  }
}