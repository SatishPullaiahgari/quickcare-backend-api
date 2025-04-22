"use strict";
// 'use strict';
// const { sanitizeEntity } = require('strapi-utils');
// module.exports = {
//   async register(ctx) {
//     const { username, email, password, role } = ctx.request.body;
//     // Validate input
//     if (!username || !email || !password || !role) {
//       return ctx.badRequest('Missing required fields');
//     }
//     // Check if the role exists
//     const foundRole = await strapi.query('plugin::users-permissions.role').findOne({ where: { name: role } });
//     if (!foundRole) {
//       return ctx.badRequest('Invalid role');
//     }
//     // Check if the username or email exists within the same role
//     const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
//       where: {
//         OR: [
//           { username, role: foundRole.id },
//           { email, role: foundRole.id },
//         ],
//       },
//     });
//     if (existingUser) {
//       return ctx.badRequest('Username or email is already taken in this role');
//     }
//     // Proceed with user creation
//     const user = await strapi.query('plugin::users-permissions.user').create({
//       data: {
//         username,
//         email,
//         password,
//         role: foundRole.id,
//       },
//     });
//     // Sanitize and return the created user
//     return sanitizeEntity(user, { model: strapi.models.user });
//   },
// };
