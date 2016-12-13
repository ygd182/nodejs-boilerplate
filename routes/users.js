




module.exports = function(passport){
    var express = require('express');
    var router = express.Router();
    var UserController = require('../controllers/UserController')(passport);


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
    router.get('/content', passport.authenticate(), UserController.getContent);


    /**
     * @api {post} /wells/:id get well by id
     * @apiName wells
     * @apiGroup System
     *
     * @apiSuccess {Object} result
     * @apiSuccess {String}   result.status    The well object.
     */
    router.post('/login',/*requireAuth,*/ UserController.login);



    /**
     * @api {get} /wells/:id/status/:date get status by well's id
     * @apiName wells
     * @apiGroup System
     *
     * @apiSuccess {Object} result
     * @apiSuccess {String}   result.status    The status object.
     */
    router.post('/', UserController.signup);

    
    return router;
};
/*
module.exports = router;*/