const applicationID = "GK7Q3EEC39";
const apiKey = "1999eb90790ce9e325af34f1a65fec25";
const indexName = "FeastFinder";

var client = algoliasearch(applicationID, apiKey);

var helper = algoliasearchHelper(client, indexName, {
  facets: ["food_type", "stars_count", "payment_options"],
});

let userLatitude;
let userLongitude;

const options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  userLatitude = crd.latitude;
  userLongitude = crd.longitude;
  helper.setQueryParameter("aroundLatLng", `${userLatitude}, ${userLongitude}`);
  helper.search();
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

helper.on("error", function (error) {
  console.error("Algolia Error:", error);
});

helper.on("result", function (event) {
  renderHits(event.results);
});

function getStarsHTML(starsCount) {
  var rating = Math.round(starsCount);
  var maxStars = 5;
  var goldStars = "";
  for (var i = 0; i < rating; i++) {
    goldStars +=
      '<span class="star gold" style="color: orange;">&#9733;</span>'; // Unicode character for star icon
  }

  // Generate HTML for gray stars for the remaining stars
  var grayStars = "";
  for (var i = rating; i < maxStars; i++) {
    grayStars += '<span class="star gray" style="color: gray;">&#9733;</span>';
  }

  var starsHTML = goldStars + grayStars;
  return starsHTML;
}

function renderHits(content) {
  $("#search-results").html(function () {
    return $.map(content.hits, function (hit) {
      var starsHTML = getStarsHTML(hit.stars_count);

      return `
          <div class="results__item">
              <div class="result">
                  <div class="result__image-container">
                  <img src="${hit.image_url}" alt="Image Description" style="width: 55%;">
                  </div>
                  <div class="result__text-container">
                      <h2 class="result__title">${hit._highlightResult.name.value}</h2>
                      <p class="result__details">
                      <span class="star count gold" style="color: orange;">${hit.stars_count}</span> ${starsHTML} (${hit.reviews_count} reviews)
                      </p>
                      <p class="result__details">${hit.food_type} | ${hit.neighborhood} | ${hit.price_range}</p>
                  </div>
              </div>
          </div>`;
    });
  });
}

helper.search();

$("#search-box").on("keyup", function () {
  helper.setQuery($(this).val()).search();
});

$("#reset-facet-button").on("click", function () {
  let searchBox = document.getElementById("search-box");
  searchBox.value = "";
  let dynamicSearchTitle = document.querySelector(".dynamic-search-title");
  if (dynamicSearchTitle) {
    let message = `<span></span>`;
    dynamicSearchTitle.innerHTML = message;
  }

  helper.clearRefinements();
  helper.setQuery("").search();
});

$("#facet-list").on("click", "input[type=checkbox]", function (e) {
  var facetValue = $(this).data("facet");
  helper.toggleFacetRefinement("food_type", facetValue).search();
});

$("#facet-list2").on("click", "input[type=checkbox]", function (e) {
  var facetValue = $(this).data("facet");
  var typeOfFacetValue = typeof facetValue;
  console.log("facetValue:", facetValue);
  console.log("Type of facetValue:", typeOfFacetValue);

  // Define the range for the filter
  const minValue = facetValue; // Minimum value (inclusive)
  const maxValue = parseFloat(facetValue) + 0.9;

  // Set the numeric filter
  if (helper.hasRefinements("stars_count")) {
    helper.clearRefinements();
  }
  helper.addNumericRefinement("stars_count", ">=", minValue);
  helper.addNumericRefinement("stars_count", "<", maxValue);
  helper.search();
});

helper.on("error", function (error) {
  console.error("Algolia Helper Error:", error.message);
});

$("#facet-list3").on("click", "input[type=checkbox]", function (e) {
  var facetValue = $(this).data("facet");
  console.log("facetValue:", facetValue);
  helper.toggleFacetRefinement("payment_options", facetValue).search();
});

function renderFacetList(content) {
  $("#facet-list").html(function () {
    return $.map(content.getFacetValues("food_type"), function (facet) {
      var checkbox = $("<input type=checkbox>")
        .data("facet", facet.name)
        .attr("id", "fl-" + facet.name);
      if (facet.isRefined) checkbox.attr("checked", "checked");
      var label = $("<label>")
        .html(facet.name + " <t>(" + facet.count + ")")
        .attr("for", "fl-" + facet.name);
      return $("<li>").append(checkbox).append(label);
    });
  });

  $("#facet-list2").html(function () {
    var checkboxesHTML = [];
    for (var i = 0; i <= 5; i++) {
      var checkbox = $("<input type=checkbox>")
        .data("facet", i.toString())
        .attr("id", "fl-" + i.toString());
      var label = $("<label>")
        .attr("for", "fl-" + i)
        .html(getStarsHTML(i)); // Generate HTML for stars using my getStarsHTML function
      checkboxesHTML.push($("<li>").append(checkbox).append(label));
    }
    return checkboxesHTML;
  });

  $("#facet-list3").html(function () {
    return $.map(content.getFacetValues("payment_options"), function (facet) {
      var checkbox = $("<input type=checkbox>")
        .data("facet", facet.name)
        .attr("id", "fl-" + facet.name);
      if (facet.isRefined) checkbox.attr("checked", "checked");
      var label = $("<label>")
        .html(facet.name + " (" + facet.count + ")")
        .attr("for", "fl-" + facet.name);
      return $("<li>").append(checkbox).append(label);
    });
  });
}

helper.on("result", function (event) {
  const nbHits = event.results.nbHits;
  const processingTimeMS = event.results.processingTimeMS;
  // Convert milliseconds to seconds with 3 decimal places precision
  const processingTimeSeconds = (processingTimeMS / 1000).toFixed(3);
  const dynamicSearchTitle = document.querySelector(".dynamic-search-title");

  if (dynamicSearchTitle) {
    const message = `<span>${nbHits} results found </span><span style="color: gray;">in ${processingTimeSeconds} seconds.</span><p>`;
    dynamicSearchTitle.innerHTML = message;
  }
  renderFacetList(event.results);
  renderHits(event.results);
});
