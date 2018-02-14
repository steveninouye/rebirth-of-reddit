//make a string to use as thumbnail image
const sampleReddit = (string, dataObj) => {
  if (string.length < 100) {
    if (string.length > 0) {
      string += '<br>';
    }
    string += dataObj.data.body;
    if (dataObj.data.replies) {
      const nextResponse = dataObj.data.replies.data.children[0];
      return sampleReddit(string, nextResponse);
    }
  }
  return string;
};

request('https://www.reddit.com/r/videos.json', function(data) {
  for (let i = 1; i < data.data.children.length; i++) {
    let img = data.data.children[i].data.preview
      ? data.data.children[i].data.preview.images[0].source.url
      : undefined;
    let image = img ? `<img src = '${img}' class = 'medImage'>` : '';
    let title = data.data.children[i].data.title;
    let author = data.data.children[i].data.author;
    let id = data.data.children[i].data.name;
    let time = howLongAgo(data.data.children[i].data.created);
    let numOfComments = data.data.children[i].data.num_comments;
    let link = data.data.children[i].data.permalink;
    link = link.slice(0, -1) + '.json';
    document.querySelector(
      'section'
    ).innerHTML += `<a href='/viewReddit'><div id = '${id}' class = 'box'>
      ${image}
      <h3>${title}</h3>
      <p>By: ${author} ${time}</p>
      <p>${numOfComments} Comments</p>
      </div></a>`;
    request(`https://www.reddit.com${link}`, function(data) {
      //find the div with the right ID
      let redditID = document.getElementById(
        data[0].data.children[0].data.name
      );

      const preview = sampleReddit('', data[1].data.children[0]);
      redditID.innerHTML += preview;
    });
  }
});
