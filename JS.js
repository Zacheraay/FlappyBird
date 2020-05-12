$(document).ready(function ()
{
    createBird();
});

var repeating;
var v = 1;
var g = .02;
var maxV = 200;
var h;
var start = false;


function createBird ()  //creates bird, sets h to css height, starts idle function after bird is initialized
{
    var bird = $("<bDiv></bDiv>");
    bird.attr('id', 'bird');
    $("#gameWindow").append(bird);

    h = parseInt(bird.css("margin-top"));

    wait = setInterval(idle, 10);
}


function updateBird () //put code that changes anything about the bird here, but no calculating, just value assignment
{
    $("#bird").css("margin-top", h);
}

function gravity () // calculates height for bird, calls updateBird to update the values
{
    if(v > 200)
    {
        v = 200;
    } else
    {
        v += g;
    }

    h += v;

    updateBird();
}

function jump () //changes velocity to negative (upward movement), gravity() will update the bird
{
    v = -7;
}


function idle () //function to wait for click to start the game
{
    if(start) //any values to change at first click (start of the game) put in here
    {
        clearInterval(wait);
        v = -7;
        g = .25;
        fall = setInterval(gravity, 10);
        repeating = setInterval(move, 1000);

    } else //adds a small sway to the bird while it waits
    {
        if(v >= 1 || v <= -1)
        {
            g *= -1;
        }

        v += g;
        h += v;

        updateBird();
    }
}

function move() {
  var randHeight = Math.ceil(Math.random() * 200);
  var pipe = $("<img></img>")
    .attr("id", "pipe")
    .attr(
      "src",
      "https://www.pngkey.com/png/detail/181-1811759_flappy-bird-pipes-png-transparent-download-8-bit.png"
    )
    .css("top", randHeight + 350);
  $(pipe).appendTo(document.body);
  var pipe2 = $("<img></img>")
    .attr("id", "pipe2")
    .attr(
      "src",
      "https://www.pngkey.com/png/detail/181-1811759_flappy-bird-pipes-png-transparent-download-8-bit.png"
    )
    .css("top", randHeight);
  $(pipe2).appendTo(document.body);
  $(pipe).animate({ left: "-700px" }, 4000, "linear");
  $(pipe2).animate({ left: "-700px" }, 4000, "linear");
}

$(document).click(function() //the first click will start game and every click will cause bird to jump
{
    start = true;
    jump();
});
