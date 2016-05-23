var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var async = require('async');
var connection = env.Dbconnection;
var categoryCRUD = CRUD(connection, 'category');
var subcategoryCRUD = CRUD(connection, 'sub_category');


/**
 * @api {post} /addcategory
 * @apiVersion 1.0.0
 * @apiName addcategory
 * @apiGroup Categories
 *
 * @apiParam {String} category_name Name of Category.
 *
 *
 * @apiSuccess {Boolean} status
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true
 *     }
 *
 *
 * @apiErrorExample Error-Response:
 *     {
 *       "status":false,
 *       "error": "Category failed to add"
 *     }
 *
 *
 * @apiDescription This api allow to add Category.
 * author - sameer [sameer@80startups.com]
 *
 *
 */
router.post('/addcategory', function(req, res) {
    categoryCRUD.create({
        'admin_id': req.body.admin_id,
        'category_name': req.body.category_name,
        'category_description': req.body.category_description,
        'category_type': req.body.category_type,
        'category_alias': '',
        'created_on': env.timestamp(),
        'modified_on': env.timestamp()
    }, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                category_id: result.insertId,
                message: 'Category Added Successfully'
            };
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Failed to Add Category'
            };
            res.jsonp(responsedata);
        }
    });
});


router.post('/getcategories', function(req, res) {
    console.log("req.body:",req.body);
    categoryCRUD.load({}, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                message: 'Category List'
            };
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Failed to Fetch Category List'
            };
            res.jsonp(responsedata);
        }
    });

});

router.post('/deletecategory', function(req, res) {
    categoryCRUD.destroy({
        category_id: req.body.category_id
    }, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                message: 'Category Deleted'
            };
            res.jsonp(responsedata);
        } else {
            console.log('Failed to Delete Category', error);
            responsedata = {
                status: false,
                record: result,
                message: 'Failed to Delete Category'
            };
            res.jsonp(responsedata);
        }
    });
});

router.post('/updatecategory', function(req, res) {
    categoryCRUD.update({
        'category_id': req.body.category_id
    }, {
        'category_name': req.body.category_name,
        'category_description': req.body.category_description,
        'category_type': req.body.category_type,
        'category_alias': '',
        'modified_on': env.timestamp()
    }, function(error, result) {
        if (result.affectedRows === 1) {
            responsedata = {
                status: true,
                record: result,
                message: 'Category Updated'
            };
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Failed to Update Category'
            };
            res.jsonp(responsedata);
        }
    });
});



router.post('/addsubcategory', function(req, res) {
    subcategoryCRUD.create({
        'category_id': req.body.category_id,
        'admin_id':req.body.adminid,
        'sub_category_name': req.body.sub_category_name,
        'sub_category_description': req.body.sub_category_description,
        'sub_category_alias': '',
        'created_on': env.timestamp(),
        'modified_on': env.timestamp()
    }, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                sub_category_id: result.insertId,
                message: 'Sub Category Added Successfully'
            };
            res.jsonp(responsedata);
        } else {
            console.log('error', error);
            responsedata = {
                status: false,
                error: error,
                message: 'Failed to Add Sub Category'
            };
            res.jsonp(responsedata);
        }
    });
});

router.post('/getsubcategories', function(req, res) {
    var query = "SELECT * FROM category JOIN sub_category ON  sub_category.category_id= category.category_id";
    connection.query(query, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                message: 'Sub Category List'
            };
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Failed to Fetch Sub Category List'
            };
            res.jsonp(responsedata);
        }
    });
});



router.post('/deletesubcategory', function(req, res) {
    subcategoryCRUD.destroy({
        sub_category_id: req.body.sub_category_id
    }, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                message: 'Sub Category Deleted'
            };
            res.jsonp(responsedata);
        } else {
            console.log('Failed to Delete Sub Category ', error);
            responsedata = {
                status: false,
                error: error,
                message: 'Failed to Delete Sub Category'
            };
            res.jsonp(responsedata);
        }
    });
});

router.post('/updatesubcategory', function(req, res) {
    subcategoryCRUD.update({
        'sub_category_id': req.body.sub_category_id
    }, {
        'category_id': req.body.category_id,
        'sub_category_name': req.body.sub_category_name,
        'sub_category_description': req.body.sub_category_description,
        'sub_category_alias': '',
        'modified_on': env.timestamp()
    }, function(error, result) {
        //  console.log(result);
        if (result.affectedRows === 1) {
            responsedata = {
                status: true,
                record: result,
                message: 'Sub Category Updated'
            };
            res.jsonp(responsedata);
        } else {
            console.log('Failed to Update Category', error);
            responsedata = {
                status: false,
                error: error,
                message: 'Failed to Update Category'
            };
            res.jsonp(responsedata);
        }
    });
});

router.get('/getallcategories', function(req, res) {
    categoryCRUD.load({}, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                message: 'Category List'
            };
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Failed to Fetch Category List'
            };
            res.jsonp(responsedata);
        }
    });

});



module.exports = router;
