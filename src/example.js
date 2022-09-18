/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

/**
 * @openapi
 * /user:
 *    get:
 *      description: Gets a list of all users
 *      security:
 *          - BearerAuth: []
 *      tags: [User]
 *      responses:
 *        200:
 *          description: successful message is successful
 */

 app.get('/', (req, res) => {
    res.send('Hello World!');
  });