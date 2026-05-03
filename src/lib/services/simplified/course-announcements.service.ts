import { courseAnnouncements } from "@/lib/db/schema";
import {
  CourseAnnouncementsSelectSchema,
  CourseAnnouncementsInsertSchema,
  CourseAnnouncementsUpdateSchema,
  CourseAnnouncementsFiltersSchema,
  type CourseAnnouncements,
  type CourseAnnouncementsCreate,
  type CourseAnnouncementsUpdate,
  type CourseAnnouncementsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CourseAnnouncementsService extends SimplifiedService<
  typeof courseAnnouncements,
  CourseAnnouncements,
  CourseAnnouncementsCreate,
  CourseAnnouncementsUpdate,
  CourseAnnouncementsFilters
> {
  constructor() {
    super(
      courseAnnouncements,
      CourseAnnouncementsSelectSchema,
      CourseAnnouncementsInsertSchema,
      CourseAnnouncementsUpdateSchema,
      CourseAnnouncementsFiltersSchema,
    );
  }
}

export const courseAnnouncementsService = new CourseAnnouncementsService();
