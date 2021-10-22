const {PrismaClient, Prisma} = require("@prisma/client");

const prisma = new PrismaClient()

const userData = [{
  id: 1,
  firstname: "Lilith",
  lastname: "Raddon",
  email: "lraddon0@1688.com",
  password: "j3cQqZUgxe6"
}, {
  id: 2,
  firstname: "Dallon",
  lastname: "Ertel",
  email: "dertel1@mozilla.com",
  password: "6EVNXiLC5VF7"
}, {
  id: 3,
  firstname: "Menard",
  lastname: "Wytchard",
  email: "mwytchard2@digg.com",
  password: "68F3WWF83Xt"
}, {
  id: 4,
  firstname: "Ulises",
  lastname: "Hampstead",
  email: "uhampstead3@telegraph.co.uk",
  password: "lCPGVkwznk2k"
}, {
  id: 5,
  firstname: "Cynde",
  lastname: "Matyas",
  email: "cmatyas4@sciencedirect.com",
  password: "84u5i5b"
}]
const postData = [{
  id: "1",
  title: "in ante vestibulum ante ipsum primis in faucibus orci luctus et",
  content: "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
  createdAt: "12/12/2020",
  updatedAt: "10/17/2021",
}, {
  id: "2",
  title: "dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat",
  content: "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
  createdAt: "12/30/2020",
  updatedAt: "12/8/2020"
}, {
  id: "3",
  title: "dui vel nisl duis ac nibh fusce lacus purus aliquet at",
  content: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
  createdAt: "4/28/2021",
  updatedAt: "3/17/2021"
}, {
  id: "4",
  title: "in blandit ultrices enim lorem ipsum dolor sit amet consectetuer",
  content: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
  createdAt: "12/8/2020",
  updatedAt: "5/18/2021"
}, {
  id: "5",
  title: "mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem",
  content: "In congue. Etiam justo. Etiam pretium iaculis justo.",
  createdAt: "6/29/2021",
  updatedAt: "10/12/2021"
}]


async function main() {
  console.log(`start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u
    })
    console.log(`Create user with id: ${user.id}`)
  }
  for (const c of commentData) {
    const user = await prisma.comment.create({
      data: c
    })
  }
  for (const p of postData) {
    const comment = await prisma.post.create({
      data: p
    })
  }

  console.log(`Seeding finished`)
}

main.catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
