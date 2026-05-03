import { newsletterSubscribers } from "@/lib/db/schema";
import {
  NewsletterSubscribersSelectSchema,
  NewsletterSubscribersInsertSchema,
  NewsletterSubscribersUpdateSchema,
  NewsletterSubscribersFiltersSchema,
  type NewsletterSubscribers,
  type NewsletterSubscribersCreate,
  type NewsletterSubscribersUpdate,
  type NewsletterSubscribersFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class NewsletterSubscribersService extends SimplifiedService<
  typeof newsletterSubscribers,
  NewsletterSubscribers,
  NewsletterSubscribersCreate,
  NewsletterSubscribersUpdate,
  NewsletterSubscribersFilters
> {
  constructor() {
    super(
      newsletterSubscribers,
      NewsletterSubscribersSelectSchema,
      NewsletterSubscribersInsertSchema,
      NewsletterSubscribersUpdateSchema,
      NewsletterSubscribersFiltersSchema,
    );
  }
}

export const newsletterSubscribersService = new NewsletterSubscribersService();
