/**
 * Content Moderation Utilities
 * 
 * This file contains helper functions for content moderation including:
 * - File validation
 * - Text profanity checking
 * - External API integration placeholders
 */

// Allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

// Max file size: 100MB
const MAX_FILE_SIZE = 100 * 1024 * 1024;

// Basic profanity/banned words list (expand as needed)
const BANNED_WORDS = [
  'spam',
  'scam',
  'hack',
  // Add more banned words here
];

export interface ModerationResult {
  approved: boolean;
  reason?: string;
}

/**
 * Validates file type and size
 */
export function validateFile(file: File, type: 'image' | 'video' | 'document'): ModerationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      approved: false,
      reason: `File size exceeds 100MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`
    };
  }

  // Check file type
  let allowedTypes: string[] = [];
  switch (type) {
    case 'image':
      allowedTypes = ALLOWED_IMAGE_TYPES;
      break;
    case 'video':
      allowedTypes = ALLOWED_VIDEO_TYPES;
      break;
    case 'document':
      allowedTypes = ALLOWED_DOCUMENT_TYPES;
      break;
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      approved: false,
      reason: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  return { approved: true };
}

/**
 * Checks text for profanity and banned words
 * Returns moderation result with reason if content is flagged
 */
export function checkTextContent(text: string): ModerationResult {
  const lowerText = text.toLowerCase();
  
  for (const word of BANNED_WORDS) {
    if (lowerText.includes(word)) {
      return {
        approved: false,
        reason: `Content contains prohibited words or phrases`
      };
    }
  }

  return { approved: true };
}

/**
 * PLACEHOLDER: External AI Moderation API Integration
 * 
 * This function is where you would integrate with an external moderation service
 * like OpenAI's Moderation API, AWS Rekognition, Google Cloud Vision, etc.
 * 
 * Example integration with OpenAI:
 * 
 * async function moderateWithOpenAI(content: string): Promise<ModerationResult> {
 *   const response = await fetch('https://api.openai.com/v1/moderations', {
 *     method: 'POST',
 *     headers: {
 *       'Content-Type': 'application/json',
 *       'Authorization': `Bearer ${OPENAI_API_KEY}`
 *     },
 *     body: JSON.stringify({ input: content })
 *   });
 *   
 *   const data = await response.json();
 *   if (data.results[0].flagged) {
 *     return {
 *       approved: false,
 *       reason: 'Content flagged by AI moderation'
 *     };
 *   }
 *   return { approved: true };
 * }
 */
export async function moderateWithExternalAPI(
  content: string,
  type: 'text' | 'image'
): Promise<ModerationResult> {
  // TODO: Implement external API integration here
  // For now, return approved
  console.log('PLACEHOLDER: External API moderation would run here for:', type);
  return { approved: true };
}

/**
 * Comprehensive content moderation check
 * Runs all validation checks on content before approval
 */
export async function moderateContent(params: {
  text?: string;
  file?: File;
  fileType?: 'image' | 'video' | 'document';
}): Promise<ModerationResult> {
  const { text, file, fileType } = params;

  // Check text content
  if (text) {
    const textResult = checkTextContent(text);
    if (!textResult.approved) {
      return textResult;
    }

    // PLACEHOLDER: Call external API for text moderation
    const apiResult = await moderateWithExternalAPI(text, 'text');
    if (!apiResult.approved) {
      return apiResult;
    }
  }

  // Check file
  if (file && fileType) {
    const fileResult = validateFile(file, fileType);
    if (!fileResult.approved) {
      return fileResult;
    }
  }

  return { approved: true };
}

export const REPORT_REASONS = [
  { value: 'spam', label: 'Spam' },
  { value: 'inappropriate', label: 'Inappropriate Content' },
  { value: 'harassment', label: 'Harassment' },
  { value: 'other', label: 'Other' }
] as const;

export const AUTO_HIDE_THRESHOLD = 3; // Auto-hide content after this many reports
