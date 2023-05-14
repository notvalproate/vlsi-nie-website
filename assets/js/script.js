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

var activityList = $(".activity-list");

fetch('assets/json/activities.json')
  .then(response => response.json())
  .then(data => {
    const activities = data.activities; 
    
    activities.forEach(element => {
        activityList.append(`
        <a class="activity-card">
            <img src="${element.poster_url}" class="activity-poster">
            <span class="activity-info-hover">Click for more info</span>
            <h2 class="activity-title">${element.title}</h2>
            <span class="activity-subtitle">${element.subtitle}</span>
        </a>
      `)
    });

    var activityCards = $(".activity-card");
    var activityInfoContainer = $(".activity-info-container");
    var activityInfoCard = $(".activity-info-card");

    var title = $("#title");
    var date_time = $("#date-time");
    var poster = $("#poster");
    var venue = $("#venue");
    var fee = $("#fee");
    var description = $("#description");
    var qr_code = $("#qr-code");
    var form_link = $("#form_link")

    activityCards.each(function(index) {
        $(this).on('click', function() {
            poster.attr("src", `${activities[index].poster_url}`);
            title.html(`${activities[index].title}`);
            date_time.html(`${activities[index].date_time}`);
            venue.html(`${activities[index].venue}`);
            fee.html(`${activities[index].fee}`);
            description.html(`${activities[index].description}`);
            qr_code.attr("src", `${activities[index].qr_code_url}`);
            form_link.attr("href", `${activities[index].form_link}`);

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