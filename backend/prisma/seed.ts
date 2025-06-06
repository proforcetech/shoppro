import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@shoppro.io' },
  });

  if (existingUser) {
    console.log('🔁 Admin user already exists:', existingUser.email);
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = await prisma.user.create({
    data: {
      email: 'admin@shoppro.io',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user seeded:', user.email);
}

main()
  .catch((e) => {
    console.error('🔥 Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
