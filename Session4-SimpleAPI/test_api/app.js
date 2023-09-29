fetch("http://localhost:4000/api/courses")
  .then(res => res.json())
  .then(data => console.log(data));
//This call will be blocked by CORS Policy ==> Cross Origin Resource Sharing
//so we will use CORS NPM TO UNBLOCK IT
