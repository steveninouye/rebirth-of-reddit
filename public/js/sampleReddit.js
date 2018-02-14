request(
  'https://www.reddit.com/r/funny/comments/7w9so2/the_hunger_games.json',
  function(data) {
    //creating shorcut to get to post's main data
    const main = data[0].data.children[0].data;

    //display main picture if available
    let img = main.preview ? main.preview.images[0].source.url : undefined;
    let image = img ? `<img src = '${img}' class = 'medImage'>` : '';
    document.getElementById('mainPic').innerHTML = image;

    //inserting title into header
    document.getElementById('title').innerHTML = main.title;

    //inserting date into header
    const date = howLongAgo(main.created);
    document.getElementById('time').innerHTML = date;

    //inserting author that created post
    document.getElementById('author').innerHTML = main.author;

    //inserting number of comments
    document.getElementById('numComments').innerHTML = main.num_comments;

    //creating an array of arrays to layer out replies to reddit
    function getReplies(array, elementByID) {
      if (array[0] && array[0].data.body) {
        let ul = document.createElement('ul');
        document.getElementById(elementByID).appendChild(ul);
        array.forEach(e => {
          if (e.data.body) {
            let li = document.createElement('li');
            li.textContent = e.data.body;
            li.setAttribute('id', e.data.name);
            ul.appendChild(li);
            if (
              e.data.replies &&
              e.data.replies.data &&
              e.data.replies.data.children
            ) {
              getReplies(e.data.replies.data.children, e.data.name);
            }
          }
        });
      }
    }
    getReplies(data[1].data.children, 'replies');
  }
);
