import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = 'admin123';
  const email = 'admin@shoppro.io';

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
     // name: 'Admin User',
      email,
      password: hashedPassword,
      role: 'ADMIN', // adjust to your schema
    },
  });

  console.log(`✅ Default admin seeded: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
