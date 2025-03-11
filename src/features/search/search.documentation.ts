/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Endpoints related to job search
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Search for jobs
 *     description: Retrieves job listings based on the provided title and location.
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The job title to search for.
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: false
 *         description: The job location (optional).
 *     responses:
 *       200:
 *         description: Successfully fetched jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Fetched jobs successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       job_title:
 *                         type: string
 *                         example: "Software Developer at Nestoil Limited"
 *                       job_location:
 *                         type: string
 *                         example: "Lagos"
 *                       job_link:
 *                         type: string
 *                         format: uri
 *                         example: "https://www.linkedin.com/jobs/view/123456789"
 *                       job_mode:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       job_source:
 *                         type: string
 *                         example: "LinkedIn.com"
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */