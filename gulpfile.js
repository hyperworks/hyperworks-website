var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
});

var awspublish = require('gulp-awspublish');
 
gulp.task('publish', function() {
 
  // create a new publisher 
  var publisher = awspublish.create({params: { Bucket: 'www.hyperworks.co.th' }});
 
  // define custom headers 
  var headers = {
     'Cache-Control': 'max-age=315360000, no-transform, public'
     // ... 
   };
 
  gulp.src('./static/**')
 
     // gzip, Set Content-Encoding headers and add .gz extension 
//    .pipe(awspublish.gzip({ ext: '.gz' }))
 
    // publisher will add Content-Length, Content-Type and headers specified above 
    // If not specified it will set x-amz-acl to public-read by default 
    .pipe(publisher.publish(headers))
 
    // create a cache file to speed up consecutive uploads 
    .pipe(publisher.cache())
 
     // print upload updates to console 
    .pipe(awspublish.reporter());
});
