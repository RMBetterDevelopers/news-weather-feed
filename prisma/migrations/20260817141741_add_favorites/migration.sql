-- CreateTable
CREATE TABLE "favorite_article" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "articleUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorite_article_userId_articleUrl_key" ON "favorite_article"("userId", "articleUrl");

-- AddForeignKey
ALTER TABLE "favorite_article" ADD CONSTRAINT "favorite_article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
