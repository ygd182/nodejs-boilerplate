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
 * @api {get} /wells/:id get well by id
 * @apiName wells
 * @apiGroup System
 *
 * @apiSuccess {Object} result
 * @apiSuccess {String}   result.status    The well object.
 */
router.get('/:id', WellController.getById);

/**
 * @api {put} /wells/:id get well by id
 * @apiName wells
 * @apiGroup System
 *
 * @apiSuccess {Object} result
 * @apiSuccess {String}   result.status    The well object.
 */
router.put('/:id', WellController.updateById);

/**
 * @api {delete} /wells/:id get well by id
 * @apiName wells
 * @apiGroup System
 *
 * @apiSuccess {Object} result
 * @apiSuccess {String}   result.status    The well object.
 */
router.delete('/:id', WellController.deleteById);

/**
 * @api {post} /wells/:id get well by id
 * @apiName wells
 * @apiGroup System
 *
 * @apiSuccess {Object} result
 * @apiSuccess {String}   result.status    The well object.
 */
router.post('/', WellController.save);

/**
 * @api {get} /wells/:id/status/:date get status by well's id
 * @apiName wells
 * @apiGroup System
 *
 * @apiSuccess {Object} result
 * @apiSuccess {String}   result.status    The status object.
 */
router.get('/:id/status/:date', WellController.getStatusByDate);

/**
 * @api {get} /wells/:id/status/:date get status by well's id
 * @apiName wells
 * @apiGroup System
 *
 * @apiSuccess {Object} result
 * @apiSuccess {String}   result.status    The status object.
 */
router.post('/:id/status/', WellController.updateStatusById);



module.exports = router;