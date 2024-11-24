/**
 * @swagger
 * tags:
 *   name: Dictionary
 *   description: For dictionary or rules used in inventory, report, or reminder
 */

/**
 * @swagger
 * /api/v2/dictionary:
 *   get:
 *     summary: Get dictionary by type
 *     description: This request is used to get dictionary by type. Can be multiple dictionary type if separate using `,`. This request is using MongoDB database
 *     tags: [Dictionary]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for pagination
 *         example: 1
 *       - name: dictionary_type
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter by dictionary type
 *         example: inventory_category
 *     responses:
 *       200:
 *         description: Dictionaries fetched successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 summary: Successful response
 *                 value:
 *                   status: success
 *                   data:
 *                     - dictionary_type: inventory_category
 *                       dictionary_name: Checkout
 *                   message: dictionaries found
 *       404:
 *         description: Dictionaries not found
 *         content:
 *           application/json:
 *             examples:
 *               not-found:
 *                 summary: No dictionaries found
 *                 value:
 *                   status: failed
 *                   message: no dictionaries found
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
 * /api/v2/dictionary:
 *   post:
 *     summary: Post dictionary
 *     description: Create a new dictionary using given name and category. This request is using MongoDB database
 *     tags: [Dictionary]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dictionary_name:
 *                 type: string
 *                 example: Fashion
 *               dictionary_type:
 *                 type: string
 *                 example: inventory_category
 *           example:
 *             dictionary_name: Fashion
 *             dictionary_type: inventory_category
 *     responses:
 *       200:
 *         description: Dictionary created successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 summary: Successful creation
 *                 value:
 *                   status: success
 *                   data:
 *                     dictionary_type: inventory_category
 *                     dictionary_name: Check
 *                     _id: 674342a8b53aabe966070f3d
 *                     createdAt: 2024-11-24T15:13:44.621Z
 *                     updatedAt: 2024-11-24T15:13:44.621Z
 *                   message: dictionary created
 *       409:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             examples:
 *               not-valid-length:
 *                 summary: Character not have valid length
 *                 value:
 *                   status: failed
 *                   message: validation failed dictionary name must be at least 2 characters
 *               not-valid-rule:
 *                 summary: Category / Type not available
 *                 value:
 *                   status: failed
 *                   message: validation failed dictionary type must be one of the following values inventory_category, inventory_unit, inventory_room, reminder_type, reminder_context, report_category
 *               empty-field:
 *                 summary: Empty field
 *                 value:
 *                   status: failed
 *                   message: validation failed dictionary_name is a required field
 *       422:
 *         description: Name has been used
 *         content:
 *           application/json:
 *             examples:
 *               conflict-name:
 *                 summary: Name has been used
 *                 value:
 *                   status: failed
 *                   message: dictionary name has been used. try another
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
 * /api/v2/dictionary/{id}:
 *   delete:
 *     summary: Delete dictionary by ID
 *     description: Permanently delete a dictionary entry using its ID. This request is using MongoDB database
 *     tags: [Dictionary]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 6737f95df63b4e261fc4151a
 *         description: The unique ID of the dictionary entry to delete
 *     responses:
 *       200:
 *         description: Dictionary deleted successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 summary: Successful deletion
 *                 value:
 *                   status: success
 *                   data:
 *                     _id: 674342a8b53aabe966070f3d
 *                     dictionary_type: inventory_category
 *                     dictionary_name: Check
 *                     createdAt: 2024-11-24T15:13:44.621Z
 *                     updatedAt: 2024-11-24T15:13:44.621Z
 *                   message: dictionary deleted
 *       404:
 *         description: Dictionary not found
 *         content:
 *           application/json:
 *             examples:
 *               not-found:
 *                 summary: Dictionary not found
 *                 value:
 *                   status: failed
 *                   message: dictionary not found
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

