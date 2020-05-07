$(document).ready(function ()
{
    createBird();
});


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

$(document).click(function() //the first click will start game and every click will cause bird to jump
{
    start = true;
    jump();
});
