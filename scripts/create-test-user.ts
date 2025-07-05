import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('testPassword123', 10);

    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: hashedPassword,
        name: 'Test User'
      }
    });

    console.log('Test user created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name
    });

  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();