
(function(){
      const courseContainer = document.querySelector('#courseNames');
      const generateCourse = function(courses){
      const courseWrapper = document.createElement('div');
      const courseDetails = document.createElement('span');
      courseDetails.innerText = courses;
      courseWrapper.appendChild(courseDetails);
      };
      fetch('/api/courses', {
        credentials: 'same origin'})
        .then(Response => Response.json())
        .then(Response => {
          for (const course of Response){
            courseContainer.appendChild(generateCourse(course));
          }
        })

    })();
