function postRequest(id) {
  document.getElementById(id).submit();
}

request('https://www.reddit.com/r/popular.json', function(data) {
  for (let i = 0; i < data.data.children.length; i++) {
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
    ).innerHTML += `<form id='form${id}' action='/' method='post'>
    <input name = 'id' type = 'hidden' value = 'https://www.reddit.com${link}'>
      <div id = '${id}' class = 'box' onclick= 'postRequest("form${id}")'>
      ${image}
      <h3>${title}</h3>
      <p>By: ${author} ${time}</p>
      <p>${numOfComments} Comments</p>
      </div></form>`;
    request(`https://www.reddit.com${link}`, function(data) {
      //find the div with the right ID
      let redditID = document.getElementById(
        data[0].data.children[0].data.name
      );
      const preview =
        data[1].data.children !== []
          ? sampleReddit('', data[1].data.children)
          : '';
      redditID.innerHTML += preview;
    });
  }
});
