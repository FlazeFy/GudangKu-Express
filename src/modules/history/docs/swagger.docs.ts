/**
 * @swagger
 * tags:
 *   name: History
 *   description: Activity of user using the apps (others API)
 */

/**
 * @swagger
 * /api/v2/history:
 *   get:
 *     summary: Get history by type
 *     description: This request is used to get history by type. Can be multiple history type if separate using `,`. This request is using MongoDB database
 *     tags: [history]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for pagination
 *         example: 1
 *     responses:
 *       200:
 *         description: Histories fetched successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   status: success
 *                   data:
 *                     - id: 6737f3c4e7312c8667334a3c
 *                       history_type: Create Item
 *                       history_context: Skincare
 *                       created_at: 2024-11-16T01:22:12.242Z
 *                   message: Histories found
 *       404:
 *         description: Histories not found
 *         content:
 *           application/json:
 *             examples:
 *               not-found:
 *                 summary: No Histories found
 *                 value:
 *                   status: failed
 *                   message: no Histories found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 summary: Internal server error
 *                 value:
 *                   status: error
 *                   message: something wrong. please contact admin
 */

/**
 * @swagger
 * /api/v2/history:
 *   post:
 *     summary: Post history
 *     description: Create a new history using given name and category. This request is using MongoDB database
 *     tags: [history]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               history_type:
 *                 type: string
 *                 example: Add Item
 *               history_context:
 *                 type: string
 *                 example: Skincare
 *           example:
 *             history_type: Add Item
 *             history_context: Skincare
 *     responses:
 *       200:
 *         description: history created successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 summary: Successful creation
 *                 value:
 *                   status: success
 *                   data:
 *                     history_type: Add Item
 *                     history_context: Skincare
 *                     _id: 674342a8b53aabe966070f3d
 *                     createdAt: 2024-11-24T15:13:44.621Z
 *                     updatedAt: 2024-11-24T15:13:44.621Z
 *                   message: history created
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             examples:
 *               not-valid-length:
 *                 summary: Character not have valid length
 *                 value:
 *                   status: failed
 *                   message: validation failed history context must be at least 2 characters
 *               not-valid-rule:
 *                 summary: Category / Type not available
 *                 value:
 *                   status: failed
 *                   message: validation failed history type must be one of the following values Add
 *               empty-field:
 *                 summary: Empty field
 *                 value:
 *                   status: failed
 *                   message: validation failed history_context is a required field
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 summary: Internal server error
 *                 value:
 *                   status: error
 *                   message: something wrong. please contact admin
 */

/**
 * @swagger
 * /api/v2/history/{id}:
 *   delete:
 *     summary: Delete history by ID
 *     description: Permanently delete a history entry using its ID. This request is using MongoDB database
 *     tags: [history]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 6737f95df63b4e261fc4151a
 *         description: The unique ID of the history entry to delete
 *     responses:
 *       200:
 *         description: history deleted successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 summary: Successful deletion
 *                 value:
 *                   status: success
 *                   data:
 *                     _id: 674342a8b53aabe966070f3d
 *                     history_type: Update Item
 *                     history_context: Skincare
 *                     createdAt: 2024-11-24T15:13:44.621Z
 *                     updatedAt: 2024-11-24T15:13:44.621Z
 *                   message: history deleted
 *       404:
 *         description: history not found
 *         content:
 *           application/json:
 *             examples:
 *               not-found:
 *                 summary: history not found
 *                 value:
 *                   status: failed
 *                   message: history not found
 *       422:
 *         description: ID not valid
 *         content:
 *           application/json:
 *             examples:
 *               not-valid-id:
 *                 summary: ID not valid
 *                 value:
 *                   status: failed
 *                   message: please provide valid id
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             examples:
 *               server-error:
 *                 summary: Internal server error
 *                 value:
 *                   status: error
 *                   message: something wrong. please contact admin
 */

