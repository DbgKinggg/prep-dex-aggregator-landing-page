import { pgTable, varchar, timestamp, unique } from 'drizzle-orm/pg-core';

export const waitlist = pgTable(
  'waitlist',
  {
    walletAddress: varchar('wallet_address', { length: 42 }).notNull(),
    email: varchar('email', { length: 255 }),
    ip: varchar('ip', { length: 45 }).notNull(),
    userAgent: varchar('user_agent', { length: 512 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    walletUnique: unique().on(table.walletAddress),
  })
);
