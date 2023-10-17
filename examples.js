Five basic data types: Strings, Numbers, Boolean, Array, and Object.
Functions: Used for reusable code, and for clean, legible code, consists of: name, arguments, and a block of code to execute.
ServiceNow provides developers with some exposed JavaScript APIs to aid them with the scripts they write, saving time in accessing records and fields in scripts.

GlideRecord class is one of the most common JavaScript APIs, very fast and handy, a staple of most scripting. 
Way of finding and counting records in ServiceNow based on many different queries. Similar to an SQL statement

var glideRecord = new GlideRecord('incident');
glideRecord.query();
while (glideRecord.next()){
//Code in this loop will run against all incident records
}

Incident is the table name
The GlideRecord variable now holds a glideRecord object for the incident table
In this case we will add no filter and simply return all records for the incident table, therefore showing the full script
This is the way coders can access the records in ServiceNow by cycling through them and applying some code to each relevant record.

variable.addQuery('<field_name'>, '<operator>', '<value_to_compare_against_field')

We've seen how to set up a glideRecord query, now above is how we filter a glideRecord for us.
Here we filter based on a field name and compare the value in that field using the operator to the value we define in the last parameter.
The default operator is that the value equals the value in the field so if this is the operator we need, we can just leave it out.

var glideRecord = new GlideRecord('problem');
glideRecord.addQuery('priority', 1);
glideRecord.query();
while (glideRecord.next()){
      //code in this loop will be run against all problem records with a priority of critical
}

This time we query all the problem records with a critical priority using our filter line
We want all the problem records with a priority equal to 1, and therefore we did not need to include it
If we want to amend the loop to return just one if it exists by changing the while loop to an if loop

var glideRecord = new GlideRecord('problem');
glideRecord.addQuery('priority', 1);
glideRecord.query();
if(glideRecord.next()) {
//code in this loop will be run against one problem record with a priority of 1 if it exists
}

This code can be used to check whether any priority critical problems exist and will run some code against it if one does
You can add more than one query and each record that is returned will need to satisfy each filter being defined. 
In that respect, it is quite like searching for a house. You could just search for all houses, but you would more likely want to build filters to find exactly what you are looking for.
With all of these filters adding up and essentially creating a series of logical AND statements, we also need a way of creating a logical OR statement.
In the same way you can add a query line, you can also add an OR condition line of script.

var glideRecord = new GlideRecord('problem');
var orQuery = glideRecord.addQuery('risk', 1)
orQuery.addOrCondition('risk', 2);
glideRecord.query();
while (glideRecord.next()) {
//code in this loop will be run against all change request records that are a very high risk or high risk
}

The original condition is stored in a variable orQuery, and then the OR condition is added to this variable before the query takes place. This type of query is handy if you want certain code to execute when a record is in a certain set of states.
There are many ways to achieve the same goal in ServiceNow and to show this, we can set up the same filter on change records using a different operator. This uses the fact that many values of choice lists in ServiceNow are numbers, so we can just search for all change requests with a risk of greater than or equal to 2.

var glideRecord = new GlideRecord('incident');
glideRecord.addQuery('urgency', 1);
glideRecord.query();
while (glideRecord.next()){
	//change all high urgency incidents to medium urgency
	glideRecord.urgency = 2;
	glideRecord.update();
}


Now we have looked at how to get all the records that we want, we will look at how to alter the records we have found. First we'll take a look at a simple update to a record. In this example, we will update all incident records with a high urgency and move it down to medium.

while(glideRecord.next()) {
glideRecord.deleteRecord();
}
Delete individual records

Delete all queried records in one go:
var glideRecord = new glideRecord('incident');
glideRecord.addQuery('category', 'network);
glideRecord.deleteMultiple();


Server-side glide classes
ServiceNow shortens GlideSystem to gs in scripts, so the methods of GlideSystem will be prefixed with gs.

var userId = gs.getUserId();
//now that we have the user's sys_id, we could use a glideRecord query to return all the fields we desire

var userObject = gs.getUser();
//easier way to get the user object and use some helper functions to access further info about the uesr.

Helpful functions:
gs.getUser().getFullName();
gs.getUser().getEmail();
gs.getUser().getLocation();
gs.getUser().getManagerID();
gs.getUser().getCompanyID();


