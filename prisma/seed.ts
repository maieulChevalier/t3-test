import { PrismaClient } from "@prisma/client";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
});

const adapter = PrismaAdapter(prisma);

const email = "maieul.chevalier@gmail.com";
async function createUsers() {
  const user = await adapter.createUser({
    id: "1",
    name: "Admin",
    email: "maieul.chevalier@gmail.com",
    emailVerified: new Date(),
    image: "https://avatars.githubusercontent.com/u/2589111?v=4",
  });
  // const user = await prisma.user.create({
  //   data: {
  //     id: "1",
  //     name: "Admin",
  //     email: "maieul.chevalier@gmail.com",
  //     emailVerified: new Date(),
  //     image: "https://avatars.githubusercontent.com/u/2589111?v=4",
  //   },
  // });
  console.log("user: ", user);
  const account = await adapter.linkAccount({
    type: "oauth",
    provider: "google",
    providerAccountId: "103112055297830355125",
    refresh_token: undefined,
    access_token:
      "ya29.a0Aa4xrXP0rciWgRAAoYeuJkaKUyEpSQINLF1lhy7f5kSAUkYBg6VjB_hzbziD7hNrhD9ELI-JLAajsR9Eug8f3Q_r8T7D1JO1mlmHn6JdINzuFBweusqm9cUlEghUKps7cLn--UmNFevA5UO9Kl68YVMun6uIaCgYKATASARESFQEjDvL9mtDhL3LURcjA9X-zYhe-7A0163",
    expires_at: 1663342868,
    id_token:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhYWJmNjkwODE5MTYxNmE5MDhhMTM4OTIyMGE5NzViM2MwZmJjYTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDYyNjI3MDQ5MjYwLTVyMm5tNW9oNTQ3dGRsdWZwajI5bzYzNzJ1Z2xsbG9sLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA2MjYyNzA0OTI2MC01cjJubTVvaDU0N3RkbHVmcGoyOW82MzcydWdsbGxvbC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMzExMjA1NTI5NzgzMDM1NTEyNSIsImVtYWlsIjoibWFpZXVsLmNoZXZhbGllckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjZnNmFkQlZScVZHRkdTWi1VTXBMQkEiLCJuYW1lIjoiTWHDr2V1bCBDaGV2YWxpZXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FGZFp1Y3BrUVNCYXBRci11WGVyVUZNYUlzbF96bXN1cm1weURRS3hKcDFrcFlzPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik1hw69ldWwiLCJmYW1pbHlfbmFtZSI6IkNoZXZhbGllciIsImxvY2FsZSI6ImVuLUdCIiwiaWF0IjoxNjYzMzM5MjY5LCJleHAiOjE2NjMzNDI4Njl9.IpI6xiSk_MjeRuPIx1szh_2MigM6ZUIgpUXI4JFIqemir1Fd2UCb73bdC9XjUuO07jqfhIRo-Lpqyyih0GGQc_mU2Vb87OZBK4UE17gj-C9ha5pWxToiYpWYXbr_FgIGzSUGXNwHu5kCEg1HmOU8mglPHPzdjHMyyRK3vD7BZXxVcMxWHkeWoXyYRF0Ece_hy2AVlWzDbv3u-XXuH1eB_IdpLJBS3cS3gX2yQtgBfG6Er8PEyxb4gV0vNN-oSsDohZrHq7UzAgWnmFcgkUTPNIgNJwnUIqxmp3l6T7jATBM7RBqbH5wEGCS5ZGs9BmruFAuXAsBKqF0vFjrDO6fADw",
    token_type: "Bearer",
    scope:
      "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    session_state: undefined,
    userId: "1",
  });
  console.log("account: ", account);

  const post = await prisma.post.create({
    data: {
      id: "1",
      title: "test",
      text: "my text",
      type: "video",
      createdBy: {
        connect: {
          id: "1",
        },
      },
      upvotedBy: {
        create: [
          {
            user: {
              connect: {
                id: "1",
              },
            },
          },
        ],
      },
      viewedBy: {
        create: [
          {
            user: {
              connect: {
                id: "1",
              },
            },
          },
        ],
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      id: "2",
      title: "test",
      text: "my text",
      type: "video",
      createdBy: {
        connect: {
          id: "1",
        },
      },
      upvotedBy: {
        create: [
          {
            user: {
              connect: {
                id: "1",
              },
            },
          },
        ],
      },
      viewedBy: {
        create: [
          {
            user: {
              connect: {
                id: "1",
              },
            },
          },
        ],
      },
    },
  });
  console.log(post);
  const test = await prisma.post.findMany({
    select: {
      _count: {
        select: { upvotedBy: true },
      },
    },
    where: {
      upvotedBy: {
        some: {
          user: {
            id: "1",
          },
        },
      },
    },
  });
  console.log("test: ", test);
}

createUsers()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
