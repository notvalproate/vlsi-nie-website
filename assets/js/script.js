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

var activityCards = $(".activity-card");
var activityInfoContainer = $(".activity-info-container");
var activityInfoCard = $(".activity-info-card");

activityCards.click(() => {
    activityInfoContainer.css("visibility", "visible");
    activityInfoCard.addClass("info-card-in");
})

activityInfoContainer.click(() => {
    activityInfoContainer.css("visibility", "hidden");
    activityInfoCard.removeClass("info-card-in");
})