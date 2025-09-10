import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const decksTable = pgTable("decks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id", { length: 255 }).notNull(), // Clerk user ID
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cardsTable = pgTable("cards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  deckId: integer("deck_id")
    .references(() => decksTable.id, { onDelete: "cascade" })
    .notNull(),
  front: text().notNull(), // Question/prompt side
  back: text().notNull(), // Answer/response side
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Define relations
export const decksRelations = relations(decksTable, ({ many }) => ({
  cards: many(cardsTable),
}));

export const cardsRelations = relations(cardsTable, ({ one }) => ({
  deck: one(decksTable, {
    fields: [cardsTable.deckId],
    references: [decksTable.id],
  }),
}));
