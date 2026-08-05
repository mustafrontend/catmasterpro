export type PromptStyle = 'flat' | 'photorealistic' | 'video' | 'glassmorphism';

export type PromptCategory = 
  | 'video-lessons'
  | 'video-aggression'
  | 'body-language'
  | 'lesson-steps'
  | 'behavior-guides'
  | 'app-assets';

export interface PromptItem {
  id: string;
  title: string;
  titleTr: string;
  category: PromptCategory;
  targetEngine: string;
  promptText: string;
  basePrompt: string;
  styleSuffix?: string;
  durationSec?: number;
  lessonId?: string;
  aspectRatio?: string;
  description: string;
  descriptionTr: string;
}

export interface PromptStyleSuffixes {
  flatIllustration: string;
  photorealistic: string;
  glassmorphism3D: string;
}
