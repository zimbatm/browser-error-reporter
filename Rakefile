require 'closure-compiler'

task :default => :min

desc "Minifies the JavaScript"
task :min => "client-error.min.js"
file "client-error.min.js" => "src/client-error.js" do |t|
  sh Closure::JAVA_COMMAND, '-jar', Closure::COMPILER_JAR, '--warning_level', 'VERBOSE', '--compilation_level', 'ADVANCED_OPTIMIZATIONS', '--js_output_file', t.name, t.prerequisites.first
end
