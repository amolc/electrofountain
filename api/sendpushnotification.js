
/********************* Cron Code **********************/


var mysql = require('mysql');
var env = require('./environment');
var moment = require('moment');
moment().format();
var connection = env.Dbconnection;
var CronJob = require('cron').CronJob;





var job = new CronJob({
  cronTime: '20 * * * * *',
  onTick: function() {
            var gcm = require('node-gcm');
            var sender = new gcm.Sender('AIzaSyAJ9kNU7h4VSK2oiqrD5EatNVvzBD6zsxw');
            var message = new gcm.Message(); 

            // getting current date
            Date.prototype.yyyymmdd = function() {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth()+1).toString(); 
                var dd  = this.getDate().toString();
                return yyyy +"-"+ (mm[1]?mm:"0"+mm[0])+"-"+(dd[1]?dd:"0"+dd[0]);
            };
              //console.log(new Date());
              var currentdate = new Date();
              var finaldate = currentdate.yyyymmdd();
              var currentUTCtime = moment.utc().format("h:mm");
              //console.log("utc hrs line no.109: ",currentUTCtime);
              //console.log(currentdate);
              
              var UTCdate = moment(currentdate).utc(Date).format("YYYY-MM-DD");
              //console.log("UTCdatetime:",UTCdate +" "+ currentUTCtime);

            message.addData('title', 'New Reminder');
            message.addData('sound', 'notification');

            message.collapseKey = 'testing'; 
            message.delayWhileIdle = true; 
            message.timeToLive = 3000; 

            var registrationIds = [];
            var remidermessages = [];
            var remindertimes = [];

          var query1 = "SELECT todo_id,todo_data,user_id,reminder_date,reminder_time,deviceid,platform,device_token FROM device_information JOIN todos ON device_information.userid=todos.user_id";
          connection.query(query1, function( error , result ){
              if(result){
                for (var i = 0; i < result.length; i++) {
                  if (result[i].reminder_date.yyyymmdd() == finaldate && result[i].reminder_time == UTCdate +" "+ currentUTCtime) {
                      //console.log("Date Time match");
                      remidermessages = result[i].todo_data;
                      registrationIds = result[i].device_token;
                      remindertimes = result[i].reminder_time;
                      message.addData('message', remidermessages);
                      
                      sender.send(message, registrationIds, function(err,result1) {
                          //console.log("the result is");
                          //console.log(result1);
                          console.log( err );
                      });
                    }

                };
              }

          });
    
  },
   start: false
});
job.start();