var express = require('express');
var router = express.Router();

var WellController = require('../controllers/WellController');

/**
 * @api {get} /wells get wells list
 * @apiName wells
 * @apiGroup System
 *
 * @apiSuccess {Object[]} result
 * @apiSuccess {String}   result.status    The status.
 * @apiSampleRequest /wells
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "OK"
 *     }
 */
router.get('/', WellController.getAll);

/**
 * @api {get} /wells/:id/status/:date get status by well's id
 * @apiName wells
 * @apiGroup System
 *
 * @apiSuccess {Object} result
 * @apiSuccess {String}   result.status    The status object.
 */
router.get('/:id/status/:date', WellController.getStatusByDate);



module.exports = router;