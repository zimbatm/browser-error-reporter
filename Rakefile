require 'closure-compiler'

task :default => :min

desc "Minifies the JavaScript"
task :min => "browser-error-reporter.min.js"
file "browser-error-reporter.min.js" => "browser-error-reporter.js" do |t|
  sh Closure::JAVA_COMMAND, '-jar', Closure::COMPILER_JAR, '--warning_level', 'VERBOSE', '--compilation_level', 'ADVANCED_OPTIMIZATIONS', '--js_output_file', t.name, t.prerequisites.first
end

task :clean do
  rm_f "browser-error-reporter.min.js"
end

task :force => [:clean, :min]
