var express = require('express');
var router = express.Router();

var UserController = require('../controllers/UserController')();


module.exports = function(passport){
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
    router.get('/content', UserController.isLoggedIn, UserController.getContent);

    /**
     * @api {get} /wells/:id get well by id
     * @apiName wells
     * @apiGroup System
     *
     * @apiSuccess {Object} result
     * @apiSuccess {String}   result.status    The well object.
     */
    router.get('/login', UserController.getLogin);


    /**
     * @api {post} /wells/:id get well by id
     * @apiName wells
     * @apiGroup System
     *
     * @apiSuccess {Object} result
     * @apiSuccess {String}   result.status    The well object.
     */
    router.post('/login',passport.authenticate("local-login", { failureRedirect: "/users/login"}), UserController.login);

    /**
     * @api {get} /wells/:id/status/:date get status by well's id
     * @apiName wells
     * @apiGroup System
     *
     * @apiSuccess {Object} result
     * @apiSuccess {String}   result.status    The status object.
     *//*
    router.get('/:id/status/:date', UserController.getStatusByDate);

    /**
     * @api {get} /wells/:id/status/:date get status by well's id
     * @apiName wells
     * @apiGroup System
     *
     * @apiSuccess {Object} result
     * @apiSuccess {String}   result.status    The status object.
     *//*
    router.post('/:id/status/', UserController.updateStatusById);

    */
    return router;
};
/*
module.exports = router;*/