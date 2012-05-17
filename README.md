JS error reporter
=================

Are you like me, wondering how many underported client errors are just
hidden from us ?

This is a minimalistic javascript file that reports the browser errors
to the webserver. Hopefully it's small enough to not itself contain any
errors. That's also why it doesn't depend on any other library.

How it works
============

Insert the script as early as possible in your page to not miss any
errors. Eg:

```html
<!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <script src="path/to/js-error-report.js"></script>
    ...
```

Now when a JavaScript error happens, the error is forwarded to
"/error_report" using XHR.

Server side implementation
===========================

Behind the scene, when getting a hit on "/error_report", you might want
to forward the error even further, into an error aggregation service
like [airbreak](http://airbreakapp.com).

```ruby
# app/controllers/failing_controller.rb
class FailingController < ApplicationController
  def index
    raise params[:message] || "this page should fail!"
  end
end

# in config/routes.rb:
post '/report_error' => 'failing#index'
```

When the controller raises an exception, airbreak catches it an forwards
it to their server, where all exceptions are nicely categorized.

Changing the reporting end-point
================================

The "/error_report" is hard-coded to avoid another possible cause of
error. We're trying to collect errors so it's quite crucial to not
introduce our own issues.

If you don't like the path of the end-point, you'll need to change it by
hand. Search for "/report_error" in the script and replace it to your
liking !

Status
======

This script is actually running on [pandastream](http://www.pandastream.com) and has helped me find a couple of unknown JavaScript issues. I'm still not 100% confident in it but it's good enough that it doesn't hurt.

Cheers,
  zimbatm
