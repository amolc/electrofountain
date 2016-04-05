var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var categoryCRUD = CRUD(connection, 'category');
var subcategoryCRUD = CRUD(connection, 'sub_category');


router.post('/addcategory', function(req, res) {
  //  console.log('Category :', req.body);
    categoryCRUD.create({
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

router.post('/addsubcategory', function(req, res) {
  //  console.log('Sub Category :', req.body);
    subcategoryCRUD.create({
        'category_id': req.body.category_id,
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

router.post('/getcategories', function(req, res) {
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

router.post('/getsubcategories', function(req, res) {
    subcategoryCRUD.load({}, function(error, result) {
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
          console.log('Failed to Delete Category',error);
            responsedata = {
                status: false,
                record: result,
                message: 'Failed to Delete Category'
            };
            res.jsonp(responsedata);
        }
    });
});

router.post('/deletesubcategory', function(req, res) {
    //console.log('delete sub category',req.body);
    subcategoryCRUD.destroy({
        sub_category_id: req.body.sub_category_id
    }, function(error, result) {
      //  console.log(result);
        if (result) {
            responsedata = {
                status: true,
                record: result,
                message: 'Sub Category Deleted'
            };
            res.jsonp(responsedata);
        } else {
            console.log('Failed to Delete Sub Category ',error);
            responsedata = {
                status: false,
                error: error,
                message: 'Failed to Delete Sub Category'
            };
            res.jsonp(responsedata);
        }
    });
});

//updatecategory
router.post('/updatecategory', function(req, res) {
  //  console.log('update category', req.body);
    categoryCRUD.update({
        'category_id': req.body.category_id
    }, {
        'category_name': req.body.category_name,
        'category_description': req.body.category_description,
        'category_type': req.body.category_type,
        'category_alias': '',
        'modified_on': env.timestamp()
    }, function(error, result) {
        //  console.log(result);
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

//updatecategory
router.post('/updatesubcategory', function(req, res) {
  //  console.log('update category', req.body);
    subcategoryCRUD.update({
        'sub_category_id': req.body.sub_category_id
    }, {
        'category_id' : req.body.category_id,
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
            console.log('Failed to Update Category',error);
            responsedata = {
                status: false,
                error: error,
                message: 'Failed to Update Category'
            };
            res.jsonp(responsedata);
        }
    });
});


module.exports = router;
