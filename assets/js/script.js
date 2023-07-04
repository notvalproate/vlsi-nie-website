var viewportHeight = window.innerHeight;
var viewportWidth = window.innerHeight;
var visionSection = $(".vision-section");

setValuesBanner();

function getScrollPosition() {
    visionSection.attr("style", `filter: brightness( ${ 100 - ((window.scrollY * 100) / viewportHeight)}% )`);
}

$(window).resize(() => {
    viewportHeight = window.innerHeight;
    viewportWidth = window.innerWidth;

    setValuesBanner();
})

function setValuesBanner() {
  if(viewportWidth < 700) {
    $("#values-banner").attr("src", "./vlsi_assets/values/final-vertical.png");
  } 
  else {
    $("#values-banner").attr("src", "./vlsi_assets/values/final.png");
  }
}

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