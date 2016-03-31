var express = require('express');
var router = express.Router();

var ExampleController = require('../controllers/ExampleController');

/**
 * @api {get} /examples get examples list
 * @apiName examples
 * @apiGroup System
 *
 * @apiSuccess {Object[]} result
 * @apiSuccess {String}   result.status    The status.
 * @apiSampleRequest /examples
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "OK"
 *     }
 */
router.get('/', ExampleController.getAll);

/**
 * @api {get} /examples/:guid/details get details by transfer's guid
 * @apiName examples
 * @apiGroup System
 *
 * @apiSuccess {Object} result
 * @apiSuccess {String}   result.details    The details object.
 */
router.get('/:eid/details', ExampleController.getDetailsById);



module.exports = router;