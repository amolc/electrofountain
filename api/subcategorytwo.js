var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var categoryCRUD = CRUD(connection, 'category');
var subcategorytwoCRUD = CRUD(connection, 'sub_category_two');
var subcategoryCRUD = CRUD(connection, 'sub_category');


router.post('/addsubCategorytwo', function(req, res) {
    subcategorytwoCRUD.create({
        'admin_id': req.body.adminid,
        'sub_cat_two_name': req.body.sub_category_two_name,
        'sub_cat_two_description': req.body.sub_category_two_description,
        'category_id': req.body.category_id,
        'sub_category_id': req.body.sub_category_id,
        'created_on': env.timestamp(),
        'modified_on': env.timestamp()
    }, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                category_id: result.insertId,
                message: 'Sub Category Two Added Successfully'
            };
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Failed to Add Sub Category Two'
            };
            res.jsonp(responsedata);
        }
    });
});


router.get('/getsubcategoriestwo', function(req, res) {
    var query = "SELECT sub_category_two.sub_catagory_two_id ,sub_category_two.sub_cat_two_name , sub_category_two.sub_cat_two_description , sub_category.sub_category_id, sub_category.sub_category_name FROM sub_category_two JOIN sub_category ON sub_category_two.sub_category_id = sub_category.sub_category_id";
    connection.query(query, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                message: 'Sub Category-two List'
            };
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Failed to Fetch Sub Category-two List'
            };
            res.jsonp(responsedata);
        }
    });

});

router.post('/deletesubcategorytwo', function(req,res){
    subcategorytwoCRUD.destroy({
        'sub_catagory_two_id': req.body.sub_catagory_two_id
    } , function(error,result) {
        if (result) {
            var responsedata ={
                status: 'true',
                record : result,
                message: 'Sub Category Two Deleted'
            };
            res.jsonp(responsedata);
        }else{
            var responsedata ={
                status : 'false',
                record : result,
                message: 'Failed To Delete Sub Category-Two'
            };
            console.log(error);
            res.jsonp(responsedata);
        }
        
    })
});

router.post('/getSubcategorybyCategoryid' ,function(req,res) {
  subcategoryCRUD.load({'category_id': req.body.categoryid}, function(error , result){
        if (result){
            var responsedata = {
                status: 'true',
                record : result,
                message: 'Getting AllSubcategy by Categoryid'
            }
            res.jsonp(responsedata);
        }else{
            var responsedata = {
                status: 'false',
                record : result,
                message: 'Getting AllSubcategy by Categoryid'
            }
            console.log("error 106:",error);
            res.jsonp(responsedata);
        }
  });  
});



/*router.post('/deletecategory', function(req, res) {
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



router.post('/addsubcategory', function(req, res) {
      console.log('Sub Category :', req.body);
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

//updatecategory
router.post('/updatesubcategory', function(req, res) {
    //  console.log('update category', req.body);
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
});*/


module.exports = router;
