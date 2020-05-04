$(document).ready(function ()
{
    createBird();
});


var v = 1;
var g = .02;
var maxV = 200;
var h;
var start = false;


function createBird ()
{
    var bird = $("<bDiv></bDiv>");
    bird.attr('id', 'bird');
    $("#gameWindow").append(bird);

    h = parseInt(bird.css("margin-top"));

    wait = setInterval(idle, 10);
}


function updateBird ()
{
    $("#bird").css("margin-top", h);
}


$(document).click(function()
{
    v = -7;
    start = true;
});


function gravity ()
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


function idle ()
{
    if(start)
    {
        clearInterval(wait);
        v = -7;
        g = .25;
        fall = setInterval(gravity, 10);

    } else
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
