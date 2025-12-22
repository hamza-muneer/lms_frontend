// Types are defined through JSDoc comments for JavaScript

/**
 * @typedef {'low' | 'medium' | 'high'} Priority
 */

/**
 * @typedef {'personal' | 'work' | 'shopping' | 'health' | 'other'} Category
 */

/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {boolean} completed
 * @property {Priority} priority
 * @property {Category} category
 * @property {Date} [dueDate]
 * @property {Date} [reminder]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 */

export {};
