import { z } from 'zod';

// Gallery image upload validation
export const galleryImageSchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .regex(/^[\w\s\-,.!?()'&]+$/, 'Title contains invalid characters'),
  description: z.string()
    .trim()
    .max(2000, 'Description must be less than 2000 characters')
    .optional(),
  location_type: z.string()
    .max(50, 'Location type must be less than 50 characters')
});

// Comment validation
export const commentSchema = z.object({
  comment_text: z.string()
    .trim()
    .min(1, 'Comment cannot be empty')
    .max(1000, 'Comment must be less than 1000 characters')
});

// Program validation
export const programSchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  shortDescription: z.string()
    .trim()
    .min(1, 'Short description is required')
    .max(500, 'Short description must be less than 500 characters'),
  fullDescription: z.string()
    .trim()
    .max(5000, 'Full description must be less than 5000 characters')
    .optional(),
  duration: z.string()
    .trim()
    .min(1, 'Duration is required')
    .max(50, 'Duration must be less than 50 characters'),
  level: z.string()
    .trim()
    .min(1, 'Level is required')
});

// Report validation
export const reportSchema = z.object({
  reason: z.enum([
    'inappropriate',
    'spam',
    'harassment',
    'copyright',
    'other'
  ], {
    errorMap: () => ({ message: 'Please select a valid reason' })
  }),
  details: z.string()
    .max(500, 'Details must be less than 500 characters')
    .optional()
    .nullable()
});
