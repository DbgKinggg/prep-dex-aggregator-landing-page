-- CreateTable
CREATE TABLE "waitlist" (
    "id" SERIAL NOT NULL,
    "wallet_address" VARCHAR(64) NOT NULL,
    "email" VARCHAR(255),
    "ip" VARCHAR(45) NOT NULL,
    "user_agent" VARCHAR(512) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_wallet_address_key" ON "waitlist"("wallet_address");
