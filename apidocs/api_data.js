define({ "api": [
  {
    "type": "post",
    "url": "/addcategory",
    "title": "",
    "version": "1.0.0",
    "name": "addcategory",
    "group": "Categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category_name",
            "description": "<p>Name of Category.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"status\":false,\n  \"error\": \"Category failed to add\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>This api allow to add Category. author - sameer [sameer@80startups.com]</p>",
    "filename": "C:/xampp/htdocs/electrofountain/api/category.js",
    "groupTitle": "Categories"
  }
] });
