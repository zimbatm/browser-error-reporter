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

Behind the scene, when getting a hit on "/error_report", you might want
to forward the error even further, into an error aggregation service
like [airbreak][http://airbreakapp.com].

Some rationales
===============

The "/error_report" is hard-coded to avoid another possible cause of
error when the page is compiled. That's also why to change it, I advise
that you re-compile the script.

Cheers,
  zimbatm
