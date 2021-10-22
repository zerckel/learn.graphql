-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "pseudo" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "author" JSONB NOT NULL,
    "content" TEXT NOT NULL,
    "comments" JSONB[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
