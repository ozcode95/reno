import type { Level } from './main-types';

export interface ViewPreset {
  id: string;
  label: string;
  group: 'Exterior' | 'Ground floor' | 'First floor' | 'Plans & cutaways';
  pos: [number, number, number];
  target: [number, number, number];
  level?: Level;
}

export const VIEWS: ViewPreset[] = [
  { id: 'street', label: 'Street view (front)', group: 'Exterior', pos: [3.4, 1.65, 33], target: [3.05, 3.6, 10] },
  { id: 'front-34', label: 'Front 3/4 view', group: 'Exterior', pos: [-4.8, 2.3, 27.5], target: [3.3, 4.0, 13] },
  { id: 'front-aerial', label: 'Front aerial', group: 'Exterior', pos: [-11, 15, 34], target: [3.05, 3.2, 8] },
  { id: 'rear-aerial', label: 'Rear aerial (back lane)', group: 'Exterior', pos: [14, 13, -17], target: [3.05, 3.5, 4] },
  { id: 'porch', label: 'Car porch', group: 'Exterior', pos: [5.2, 1.6, 17.6], target: [1.8, 1.4, 11.8] },
  { id: 'gate', label: 'At the gate', group: 'Exterior', pos: [3.05, 1.6, 19.6], target: [3.05, 2.2, 12] },
  { id: 'balcony', label: 'Balcony', group: 'First floor', pos: [1.6, 5.2, 12.4], target: [3.8, 4.3, 16.4] },
  { id: 'balcony-back', label: 'Balcony → master façade', group: 'First floor', pos: [2.2, 5.1, 16.0], target: [3.3, 5.2, 11.7] },
  { id: 'yard', label: 'Rear yard', group: 'Exterior', pos: [5.6, 1.55, -2.35], target: [1.5, 1.8, 0.2] },

  { id: 'living', label: 'Living room', group: 'Ground floor', pos: [5.6, 1.6, 11.3], target: [1.6, 1.3, 7.8] },
  { id: 'entrance', label: 'Front door → 神台 (altar)', group: 'Ground floor', pos: [1.65, 1.6, 11.3], target: [1.65, 1.35, 7.7] },
  { id: 'living-front', label: 'Living → front doors', group: 'Ground floor', pos: [3.9, 1.6, 7.0], target: [3.4, 1.3, 11.7] },
  { id: 'dining', label: 'Dining & kitchen', group: 'Ground floor', pos: [4.9, 1.6, 9.0], target: [4.5, 1.2, 1.0] },
  { id: 'stair', label: 'Staircase', group: 'Ground floor', pos: [4.6, 1.6, 6.3], target: [2.1, 1.7, 5.0] },
  { id: 'kitchen', label: 'Kitchen', group: 'Ground floor', pos: [4.7, 1.6, 4.1], target: [4.8, 1.1, 0.1] },
  { id: 'bath3', label: 'Bathroom 3', group: 'Ground floor', pos: [4.4, 1.6, 1.2], target: [2.4, 1.0, 0.6] },
  { id: 'bed4', label: 'Bedroom 4', group: 'Ground floor', pos: [2.8, 1.6, 4.1], target: [0.6, 1.2, 0.8] },

  { id: 'family', label: 'Family hall', group: 'First floor', pos: [5.6, 5.2, 7.2], target: [2.0, 4.6, 4.9] },
  { id: 'master', label: 'Master bedroom', group: 'First floor', pos: [0.6, 5.2, 8.1], target: [2.9, 4.6, 11.7] },
  { id: 'master-in', label: 'Master bedroom → doors', group: 'First floor', pos: [1.1, 5.2, 11.2], target: [4.0, 4.6, 8.6] },
  { id: 'bath1', label: 'Bathroom 1 (ensuite)', group: 'First floor', pos: [3.5, 5.2, 10.7], target: [5.8, 4.4, 10.8] },
  { id: 'bed2', label: 'Bedroom 2', group: 'First floor', pos: [4.4, 5.2, 4.1], target: [4.6, 4.6, 0.2] },
  { id: 'bed3', label: 'Bedroom 3', group: 'First floor', pos: [1.6, 5.2, 4.1], target: [1.5, 4.6, 0.2] },
  { id: 'stair-up', label: 'Top of the stairs', group: 'First floor', pos: [4.2, 5.2, 7.0], target: [1.3, 3.8, 6.9] },

  { id: 'plan-gf', label: 'Ground floor plan (top)', group: 'Plans & cutaways', pos: [3.05, 26, 7.3], target: [3.05, 0, 7.29], level: 'gf' },
  { id: 'plan-ff', label: 'First floor plan (top)', group: 'Plans & cutaways', pos: [3.05, 28, 8.3], target: [3.05, 3.6, 8.29], level: 'noroof' },
  { id: 'doll-gf', label: 'Ground floor cutaway (3D)', group: 'Plans & cutaways', pos: [10.5, 19, 16.5], target: [3.05, 0.3, 5.8], level: 'gf' },
  { id: 'doll-ff', label: 'First floor cutaway (3D)', group: 'Plans & cutaways', pos: [12, 16, 20], target: [3.05, 3.8, 7], level: 'noroof' },
];
