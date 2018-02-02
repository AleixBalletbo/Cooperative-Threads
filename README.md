# Cooperative-Threads

This small Javascript program emulates the behaviour of a cooperative thread system, executing concurrently different thunks of code. It is implemented using Continuations provided by the Javascript Rhino implementation.

``` bash
# execution of a test
cd tests
rhino -opt -2 <testFile.js>
