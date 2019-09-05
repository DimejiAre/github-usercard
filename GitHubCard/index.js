/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['andela-abisoye', 'melquip', 'amxra', 'josenriagu', 'ladrillo'];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function githubCardMaker(user) {
  const data = user.data
  const [cardDiv, userImg, cardInfoDiv, h3, a] = ['div', 'img', 'div', 'h3', 'a']
    .map(element => document.createElement(element))
  const [usernameP, locationP, profileP, followersP, followingP, bioP] = ['p', 'p', 'p', 'p', 'p', 'p',]
    .map(element => document.createElement(element))

  // add classes and content
  cardDiv.classList.add('card');
  userImg.src = data.avatar_url
  cardInfoDiv.classList.add('card-info');
  h3.classList.add('name');
  h3.textContent = data.name;
  usernameP.classList.add('username');
  usernameP.textContent = data.login;
  locationP.textContent = `Location: ${data.location}`;
  profileP.textContent = 'Profile: ';
  a.href = data.html_url;
  a.textContent = data.html_url;
  followersP.textContent = `followers: ${data.followers}`;
  followingP.textContent = `following: ${data.following}`;
  bioP.textContent = `Bio: ${data.bio}`;

  // create structure
  profileP.appendChild(a);

  cardInfoDiv.appendChild(h3);
  cardInfoDiv.appendChild(usernameP);
  cardInfoDiv.appendChild(locationP);
  cardInfoDiv.appendChild(profileP);
  cardInfoDiv.appendChild(followersP);
  cardInfoDiv.appendChild(followingP);
  cardInfoDiv.appendChild(bioP);

  cardDiv.appendChild(userImg);
  cardDiv.appendChild(cardInfoDiv);

  return cardDiv

}

function addCard(user) {
  axios({
    method: 'get',
    url: `https://api.github.com/users/${user}`
    // auth: {
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASS
    // }
  })
    .then(user => {
      let githubCard = githubCardMaker(user);
      document.querySelector('.cards').appendChild(githubCard)
    })
    .catch(err => {
      return err
    })
}

addCard('DimejiAre')

// Add Followers Manual
// followersArray.forEach(user => {
//   addCard(user)
// })

// Add Followers Automated
axios({
  method: 'get',
  url: `https://api.github.com/users/DimejiAre/followers`
})
  .then(response => {
    let followers = response.data
    followers.forEach(follower => {
      addCard(follower.login)
    })
  })
  .catch(err => {
    return err
  })