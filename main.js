async function getPoses(pose) {
  const response = await fetch(
    `https://lightning-yoga-api.herokuapp.com/yoga_poses?english_name=${pose}`
  );

  return (poseResponse = response.json());
}
async function getPosePage() {
  let poseId = sessionStorage.getItem("poseId");

  const response = await fetch(
    `https://lightning-yoga-api.herokuapp.com/yoga_poses/${poseId}`
  );
  return (poseResponse = response.json());
}

document.querySelector("#searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = document.querySelector("#searchText").value;
  getPoses(searchText)
    .then((data) => {
      const posesContainer = document.querySelector("#poses");
      let posesTitle = document.querySelector("#posesFound");
      const poses = data.items;
      if (poses.length == 0) {
        posesTitle.innerHTML = `<h2 class="poseCount">No poses Found</h2>`;
      } else {
        posesTitle.innerHTML = `<h2 class='poseCount'>Found ${poses.length} Poses</h2>`;
        let output = "";
        poses.forEach((pose) => {
          output += ` <div class="card">
                        <img src="${pose.img_url}">
                        <a onclick="poseSelected('${pose.id}')" href="#" class="card-title">${pose.sanskrit_name}</a>                       
                        <p class="englishName">English name: ${pose.english_name}</p>
                        </div>
                        `;
        });
        posesContainer.innerHTML = output;
      }
    })
    .catch((err) => console.log(err));
});

function poseSelected(id) {
  sessionStorage.setItem("poseId", id);
  window.location = "pose.html";
  return false;
}

function getPose() {
  getPosePage()
    .then((pose) => {    
      document.querySelector(
        "#poseTitle"
      ).innerHTML = `<h2 class="poseCount">${pose.sanskrit_name} (${pose.english_name})</h2>`;
      const poseImg = document.querySelector("#pose-img");
      poseImg.innerHTML = `<img src="${pose.img_url}">`;
      const poseDetails = document.querySelector("#pose-details");
      let output = ` <div id="categories">Categories</div>
                        <ul>`;
      pose.yoga_categories.forEach((category) => {
        output += `<li>${category.name}<br><p>${category.description}<p></li>`;
      });
      output += `</ul>`;
      poseDetails.innerHTML = output;
    })
    .catch((err) => console.log(err));
}
