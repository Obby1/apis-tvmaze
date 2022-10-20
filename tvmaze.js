"use strict";
// declare global variables show?


const MISSING_IMAGE_URL = "https://tinyurl.com/tv-missing";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  let response = await axios.get(
    `http://api.tvmaze.com/search/shows?q=${term}`);
    //switch to params {}
    let shows = response.data.map(movie => {
      let show = movie.show;
      return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image ? show.image.medium :MISSING_IMAGE_URL,
    };
  });

  return shows;
  // console.log(shows);

}






/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();
  // console.log(`populate shows function ${shows}`);
  // console.log(shows);
  for (let show of shows) {
    // console.log(`for loop show is ${show.name}`);
    console.log(show.image);
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src=${show.image}
              alt="" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  console.log(`search function clicked`)
  const term = $("#search-query").val();
  console.log(`const term is ${term}`);
  const shows = await getShowsByTerm(term);
  // console.log (term);
  console.log(`shows var = ${shows}`);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) { 
  let response = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  let episodes = response.data.map(episode => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
  }));

  return episodes;
}

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }


// Original function below: 
// async function getShowsByTerm( /* term */) {
//   // ADD: Remove placeholder & make request to TVMaze search shows API.

//   return [
//     {
//       id: 1767,
//       name: "The Bletchley Circle",
//       summary:
//         `<p><b>The Bletchley Circle</b> follows the journey of four ordinary 
//            women with extraordinary skills that helped to end World War II.</p>
//          <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their 
//            normal lives, modestly setting aside the part they played in 
//            producing crucial intelligence, which helped the Allies to victory 
//            and shortened the war. When Susan discovers a hidden code behind an
//            unsolved murder she is met by skepticism from the police. She 
//            quickly realises she can only begin to crack the murders and bring
//            the culprit to justice with her former friends.</p>`,
//       image:
//           "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
//     }
//   ]
// }


//original function below:
// function populateShows(shows) {
//   $showsList.empty();

//   for (let show of shows) {
//     const $show = $(
//         `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
//          <div class="media">
//            <img 
//               src="http://static.tvmaze.com/uploads/images/medium_portrait/160/401704.jpg" 
//               alt="Bletchly Circle San Francisco" 
//               class="w-25 mr-3">
//            <div class="media-body">
//              <h5 class="text-primary">${show.name}</h5>
//              <div><small>${show.summary}</small></div>
//              <button class="btn btn-outline-light btn-sm Show-getEpisodes">
//                Episodes
//              </button>
//            </div>
//          </div>  
//        </div>
//       `);

//     $showsList.append($show);  }
// }

// my original not working version:
// async function getShowsByTerm(term) {
//   const result = await axios.get(`https://api.tvmaze.com/search/shows`, {params:
//   {q:term}});
//   const shows = [];
//   for (let movie of result.data){
//   const tempObj = {};
//   tempObj.id = movie.show.id;
//   tempObj.name = movie.show.name;
//   tempObj.summary = movie.show.summary;
//   tempObj.image = movie.show.image.original;
//   shows.push(tempObj);
//   }
//   // console.log(shows);
//   return shows
  
//   }

// async function getShowsByTerm(term) {
//   let response = await axios.get(
//     `http://api.tvmaze.com/search/shows?q=${term}`);

//   console.log(response.data);

//   let shows = response.data.map(result => {
//     let show = result.show;
//     console.log(result.show);
//     return {
//       id: show.id,
//       name: show.name,
//       summary: show.summary,
//       image: show.image ? show.image.medium : MISSING_IMAGE_URL,
//     };
//   });

//   return shows;

// }

// function populateShows(shows) {
//   $showsList.empty();
//   console.log(shows);
//   for (let show of shows) {
//     console.log(show.name);
//     const $show = $(
//         `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
//          <div class="media">
//            <img 
//               src=${show.image}
//               alt="Bletchly Circle San Francisco" 
//               class="w-25 mr-3">
//            <div class="media-body">
//              <h5 class="text-primary">${show.name}</h5>
//              <div><small>${show.summary}</small></div>
//              <button class="btn btn-outline-light btn-sm Show-getEpisodes">
//                Episodes
//              </button>
//            </div>
//          </div>  
//        </div>
//       `);

//     $showsList.append($show);  }
// }
