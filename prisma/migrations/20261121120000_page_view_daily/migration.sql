-- CreateTable
CREATE TABLE "PageViewDaily" (
    "day" DATE NOT NULL,
    "path" VARCHAR(200) NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PageViewDaily_pkey" PRIMARY KEY ("day","path")
);

-- CreateIndex
CREATE INDEX "PageViewDaily_day_idx" ON "PageViewDaily"("day");
