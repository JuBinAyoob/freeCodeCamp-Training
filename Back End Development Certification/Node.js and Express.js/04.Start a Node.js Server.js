 //Documentation
/*
  Documentation on the fs module can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_apidoc/fs.html
  
  Documentation on Buffers can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_apidoc/buffer.html
  
  Documentation on the path module can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_apidoc/path.html
  
  To learn more about callbacks, check out:  
  (https://github.com/maxogden/art-of-node#callbacks).  
  
  Documentation on the http module can be found by pointing your browser here:  
  file:///home/ec2-user/.nvm/versions/node/v6.13.1/lib/node_modules/learnyounode/node_apidoc/http.html

*/

 //2nd assgn:babystep
 /*
 
 console.log(process.argv);
 
  The first element of the process.argv array  
  is always 'node', and the second element is always the path to your  
  program.js file, so you need to start at the 3rd element (index 2), adding  
  each item to the total until you reach the end of the array. 
 */
 
 let args=process.argv,sum=0;
 for(let i=2;i<args.length;i++)
    sum +=+args[i];  // OR Number(args[i]); OR parseInt(args[i]);
 console.log(sum);
 
 //system solution
    var result = 0
    
    for (var i = 2; i < process.argv.length; i++) {
      result += Number(process.argv[i])
    }
    
    console.log(result)

//3rd assgn:MY FIRST I/O!

/*
  To perform a filesystem operation you are going to need the fs module from  
  the Node core library. To load this kind of module, or any other "global"  
  module, use the following incantation:  
   
     var fs = require('fs')  
   
  Now you have the full fs module available in a variable named fs.

  All synchronous (or blocking) filesystem methods in the fs module end with  
  'Sync'. To read a file, you'll need to use  
  fs.readFileSync('/path/to/file'). This method will return a Buffer object  
  containing the complete contents of the file.    
   
  Buffer objects are Node's way of efficiently representing arbitrary arrays  
  of data, whether it be ascii, binary or some other format. Buffer objects  
  can be converted to strings by simply calling the toString() method on  
  them. e.g. var str = buf.toString().    
   
  If you're looking for an easy way to count the number of newlines in a  
  string, recall that a JavaScript String can be .split() into an array of  
  substrings and that '\n' can be used as a delimiter. Note that the test  
  file does not have a newline character ('\n') at the end of the last line,  
  so using this method you'll end up with an array that has one more element  
  than the number of newlines.
*/
const fs = require('fs')

const contents = fs.readFileSync(process.argv[2], 'utf8')
const lines = contents.toString().split('\n').length - 1
console.log(lines)


//4th assgn:MY FIRST ASYNC I/O!
/*
  The solution to this problem is almost the same as the previous problem  
  except you must now do it the Node.js way: asynchronous.  
   
  Instead of fs.readFileSync() you will want to use fs.readFile() and  
  instead of using the return value of this method you need to collect the  
  value from a callback function that you pass in as the second argument. To  
  learn more about callbacks, check out:  
  (https://github.com/maxogden/art-of-node#callbacks).  
   
  Remember that idiomatic Node.js callbacks normally have the signature:  
   
     function callback (err, data) {...}  
   
  so you can check if an error occurred by checking whether the first  
  argument is truthy. If there is no error, you should have your Buffer  
  object as the second argument. As with readFileSync(), you can supply  
  'utf8' as the second argument and put the callback as the third argument  
  and you will get a String instead of a Buffer.
*/
const fs = require('fs')
const file = process.argv[2]

fs.readFile(file, function (err, contents) {
  if (err) {
    return console.log(err)
  }
  // fs.readFile(file, 'utf8', callback) can also be used
  const lines = contents.toString().split('\n').length - 1
  console.log(lines)
})


//5th assgn:FILTERED LS 
/*
  The fs.readdir() method takes a pathname as its first argument and a  
  callback as its second. The callback signature is:  
   
     function callback (err, list) {... }  
   
  where list is an array of filename strings.    
   
  You may also find node's path module helpful, particularly the extname  
  method.    

*/

const fs = require('fs')
const path = require('path')

const folder = process.argv[2]
const ext = '.' + process.argv[3]

fs.readdir(folder, function (err, files) {
  if (err) return console.error(err)
  files.forEach(function (file) {
    if (path.extname(file) === ext) {
      console.log(file)
    }
  })
})



//6th assgn:MAKE IT MODULAR
/*
This problem is the same as the previous but introduces the concept of  
  modules. You will need to create two files to solve this.  
   
  Create a program that prints a list of files in a given directory,  
  filtered by the extension of the files. The first argument is the  
  directory name and the second argument is the extension filter. Print the  
  list of files (one file per line) to the console. You must use  
  asynchronous I/O.  
   
  You must write a module file to do most of the work. The module must  
  export a single function that takes three arguments: the directory name,  
  the filename extension string and a callback function, in that order. The  
  filename extension argument must be the same as what was passed to your  
  program. Don't turn it into a RegExp or prefix with "." or do anything  
  except pass it to your module where you can do what you need to make your  
  filter work.  
   
  The callback function must be called using the idiomatic node(err, data)  
  convention. This convention stipulates that unless there's an error, the  
  first argument passed to the callback will be null, and the second will be  
  your data. In this exercise, the data will be your filtered list of files,  
  as an Array. If you receive an error, e.g. from your call to  
  fs.readdir(), the callback must be called with the error, and only the  
  error, as the first argument.  
   
  You must not print directly to the console from your module file, only  
  from your original program.  
   
  In the case of an error bubbling up to your original program file, simply  
  check for it and print an informative message to the console.  
   
  These four things are the contract that your module must follow.  
   
   1. Export a single function that takes exactly the arguments described.  
   2. Call the callback exactly once with an error or some data as described.  
   3. Don't change anything else, like global variables or stdout.  
   4. Handle all the errors that may occur and pass them to the callback.  
   
  The benefit of having a contract is that your module can be used by anyone  
  who expects this contract. So your module could be used by anyone else who  
  does learnyounode, or the verifier, and just work.  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 ## HINTS  
   
  Create a new module by creating a new file that just contains your  
  directory reading and filtering function. To define a single function  
  export, you assign your function to the module.exports object, overwriting  
  what is already there:  
   
     module.exports = function (args) { ... }  
   
  Or you can use a named function and assign the name.  
   
  To use your new module in your original program file, use the require()  
  call in the same way that you require('fs') to load the fs module. The  
  only difference is that for local modules must be prefixed with './'. So,  
  if your file is named mymodule.js then:  
   
     var mymodule = require('./mymodule.js')  
   
  The '.js' is optional here and you will often see it omitted.  
   
  You now have the module.exports object in your module assigned to the  
  mymodule variable. Since you are exporting a single function, mymodule is  
  a function you can call!  
   
  Also keep in mind that it is idiomatic to check for errors and do  
  early-returns within callback functions:  
   
     function bar (callback) {  
       foo(function (err, data) {  
         if (err)  
           return callback(err) // early return  
       
         // ... no error, continue doing cool things with `data`  
       
         // all went well, call callback with `null` for the error argument  
       
         callback(null, data)  
       })  
     }  


*/
//test.js file
const filterFn = require('./test_filter.js')
const dir = process.argv[2]
const filterStr = process.argv[3]

filterFn(dir, filterStr, function (err, list) {
  if (err) {
    return console.error('There was an error:', err)
  }

  list.forEach(function (file) {
    console.log(file)
  })
})

//test_filter.js file
const fs = require('fs')
const path = require('path')

module.exports = function (dir, filterStr, callback) {
  fs.readdir(dir, function (err, list) {
    if (err) {
      return callback(err)
    }

    list = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr
    })

    callback(null, list)
  })
}


//7th assgn:HTTP Client
/*
   Write a program that performs an HTTP GET request to a URL provided to you  
  as the first command-line argument. Write the String contents of each  
  "data" event from the response to a new line on the console (stdout).  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
 ## HINTS  
   
  For this exercise you will need to use the http core module.    
   
  The http.get() method is a shortcut for simple GET requests, use it to  
  simplify your solution. The first argument to http.get() can be the URL  
  you want to GET; provide a callback as the second argument.  
   
  Unlike other callback functions, this one has the signature:  
   
     function callback (response) {  ... }  
   
  Where the response object is a Node Stream object. You can treat Node  
  Streams as objects that emit events. The three events that are of most  
  interest are: "data", "error" and "end". You listen to an event like so:  
   
     response.on("data", function (data) {  ...  })  
   
  The "data" event is emitted when a chunk of data is available and can be  
  processed. The size of the chunk depends upon the underlying data source.  
   
  The response object / Stream that you get from http.get() also has a  
  setEncoding() method. If you call this method with "utf8", the "data"  
  events will emit Strings rather than the standard Node Buffer objects  
  which you have to explicitly convert to Strings.

*/

const http = require('http')

http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  response.on('data', console.log)
  response.on('error', console.error)
}).on('error', console.error)
