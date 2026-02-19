import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    const email = 'mvrdutra@gmail.com'
    const name = 'Venicios Ribeiro'

    const user = await prisma.authorizedEmail.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name,
            active: true,
        },
    })

    console.log(`Created authorized email: ${user.email}`)
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
