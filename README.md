Browser error reporter
======================

Are you like me, wondering how many underported client errors are just
hidden from us ? Well.. you can stop being in the dark today !

With just a couple of steps, you will start getting all these nasty
errors that you never saw because who tests his site in IE anymore ?

Install that thing
==================

1: Insert the script as early as possible in your page to not miss any
   errors. Eg:

```html
<!doctype html>
<html>
  <head>
    <meta charset=utf-8>
    <script src="path/to/client-error.js"></script>
    ...
```

2: Change your webapp to accept POST requests on the "/error_report"
   end-point. For example in Rails, I use this kind of controller to
   forward the errors to [Airbrake](http://airbrakeapp.com/).

```ruby
# app/controllers/failing_controller.rb
class FailingController < ApplicationController
  def index
    # We should get message, file and line parameters from the
    # JavaScript client
    raise params[:message] || "this page should fail!"
  end
end

# in config/routes.rb:
post '/report_error' => 'failing#index'
```

When the controller raises an exception, airbreak catches it an forwards
it to their server, where all exceptions are nicely categorized.

(Examples for other kind of backends are welcome)

3: Profit !

If you have any issues, just add it to the [bug tracker](https://github.com/zimbatm/browser-error-reporter/issues) and I'll take a
look.

Status
======

This script is actually running on [PandaStream](http://www.pandastream.com) and has helped me find a couple of unknown JavaScript issues. I'm still not 100% confident in it but it's good enough that it doesn't hurt.

Design
======

The JavaScript has no external dependencies and is kept as small as
possible. This to avoid the error reporter having errors himself.

The "/error_report" is hard-coded to avoid another possible cause of
error. We're trying to collect errors so it's quite crucial to not
introduce our own issues. If you don't like the path of the end-point,
you'll need to change it by hand. Search for "/report_error" in the script
and replace it to your liking !

Licence: MIT


Cheers,
  zimbatm
