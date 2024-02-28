const circle = document.getElementById("circle");

const observer = new IntersectionObserver((items) => {
  //   console.log(items);
  const trackingInfo = items[0];
  if (trackingInfo.isIntersecting) {
    console.log("Circle is visible");
    //it will be disconnect after the intersection
    observer.disconnect();
  } else {
    console.log("Circle is not visible");
  }
});

observer.observe(circle);
