// Code for setting the brightness of VISION SECTION dynamically

var viewportHeight = window.innerHeight;
var viewportWidth = window.innerHeight;
var visionSection = $(".vision-section");

function getScrollPosition() {
    visionSection.attr("style", `filter: brightness( ${ 100 - ((window.scrollY * 100) / viewportHeight)}% )`);
}

// Update the two variables in resize of window
$(window).resize(() => {
    viewportHeight = window.innerHeight;
    viewportWidth = window.innerWidth;
})

// Code for ACTIVITY CARDS

// Code for dynamically adding the cards

// TEMPLATE FOR ADDING OBJECTS IN THE JSON
// {
//   "title":"AMD Processors",
//   "subtitle":"Come here to check out how AMD makes it's processors",
//   "poster_url":"./assets/images/activity-placeholder.png",
//   "date_time":"6:00PM, May 16",
//   "venue":"GJB, NIdE",
//   "fee":"Free for All",
//   "description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum tenetur officia voluptates unde ab magnam sit possimus. Ut, sequi, magni cum veniam sed totam es.",
//   "qr_code_url":"./assets/images/qr-code.png",
//   "form_link":"https://www.amd.com"
// },

var activityList = $(".activity-list");

fetch('assets/json/activities.json')
  .then(response => response.json())
  .then(data => {
    const activities = data.activities; 
    
    if(activities.length === 0) {
      activityList.append(`
        <span class="no-activity">No Upcoming Activities. Will be updated shortly.</span>
      `);
      return;
    }

    console.log("hi");

    activities.forEach(element => {
        activityList.append(`
        <a class="new-activity-card">
          <div class="logo-date">
            <img class="activity-logo-icon" src="vlsi_assets/activities_card/v_icon_card-18.png" alt="icon.png">
            <span class="activity-date">${element.date_time_short}</span>
          </div>
          <img src="${element.poster_url}" alt="placeholder.png" class="activity-poster">
          <p class="activity-info">${element.subtitle}</p>
          <div class="register-wrapper">
            <div class="register-button">REGISTER</div>
          </div>
        </a>
      `)
    });

    var activityCards = $(".new-activity-card");
    var activityInfoContainer = $(".activity-info-container");
    var activityInfoCard = $(".activity-info-card");

    activityCards.each(function(index) {
        $(this).on('click', function() {
            $("#poster").attr("src", `${activities[index].poster_url}`);
            $("#title").html(`${activities[index].title}`);
            $("#date-time").html(`${activities[index].date_time}`);
            $("#venue").html(`${activities[index].venue}`);
            $("#fee").html(`${activities[index].fee}`);
            $("#description").html(`${activities[index].description}`);
            $("#qr-code").attr("src", `${activities[index].qr_code_url}`);
            $("#form_link").attr("href", `${activities[index].form_link}`);

            activityInfoContainer.css("visibility", "visible");
            activityInfoCard.addClass("info-card-in");
        });
    });

    activityInfoContainer.click(() => {
        activityInfoContainer.css("visibility", "hidden");
        activityInfoCard.removeClass("info-card-in");
    })
  })
  .catch(error => {
    console.log('Error:', error);
  });