/***********************************************************************************************************************************
document wait/start
***********************************************************************************************************************************/

$(document).ready(function ()
{
    createBird();
});


var start = false;


function idle ()
{
    if(start)
    {
        clearInterval(wait);
        v = -7;
        g = .25;
        fall = setInterval(checkBird, 10);
        init = setInterval(createPipe, 1500);
        move = setInterval(pipeMotion, 5);
    } else
    {
        if(v >= 1 || v <= -1)
        {
            g *= -1;
        }

        v += g;
        y += v;

        updateBird();
    }
}

/***********************************************************************************************************************************
Bird
***********************************************************************************************************************************/

var maxV = 200;
var h = 50;
var w = 60;
var x = 200;
var y;
var v = 1;
var g = .02;


function createBird ()
{
    var bird = $("<bDiv></bDiv>")
    bird
        .attr("id", "bird")
        .css("width", w)
        .css("height", h)
        .css("left", x);
    $("#gameWindow").append(bird);

    y = parseInt(bird.css("margin-top"));

    wait = setInterval(idle, 10);
}


function updateBird ()
{
    if(isCollided())
    {
        clearInterval(move);
        clearInterval(init);
    }

    $("#bird").css("margin-top", y);
}


function checkBird ()
{
    rebound();
    gravity();
    ground();
    updateBird();
}


function jump ()
{
    v = -7;
}


function gravity ()
{
    if(v > 200)
    {
        v = 200;
    } else
    {
        v += g;
    }

    y += v;
}


function rebound ()
{
    if(y < 0)
    {
        y = 0;
        v = 0;
    }
}


function ground ()
{
    if(y + parseInt($("#bird").css("height")) > 800)
    {
        clearInterval(fall);
        clearInterval(init);
        clearInterval(move);
        y = 800 - parseInt($("#bird").css("height"));
        updateBird();
    }
}

/***********************************************************************************************************************************
Pipes
***********************************************************************************************************************************/

var pipeCount = 0;
var distance;
var minPipe = 1;


function createPipe ()
{
    pipeCount++;

    var pVert = Math.random() * 400 + 200;
    var pWidth = 100;
    var gapWidth = 100;

    var lowPipe = $("<pDiv></pDiv>")
        .addClass("lPipe "+pipeCount);
    var highPipe = $("<pDiv></pDiv>")
        .addClass("hPipe "+pipeCount);
    $("#gameWindow").append(lowPipe);
    $("#gameWindow").append(highPipe);

    lowPipe
        .css("width", pWidth)
        .css("margin-top", pVert + gapWidth)
        .css("height", 800 - (pVert + gapWidth));
    highPipe
        .css("width", pWidth)
        .css("margin-top", 0)
        .css("height", pVert - gapWidth);
    $("."+pipeCount)
        .css("left", 600);

}


function pipeMotion ()
{
    for(var i = minPipe; i <= pipeCount; i++)
    {
        var xpos = parseInt($("."+i).css("left"));
        distance = xpos - 1;
        checkPipe(i);
    }

}


function checkPipe (i)
{
    if(distance < parseInt($(".lPipe").css("width")) * -1)
    {
        deletePipe(i);
    } else
    {
        updatePipe(i);
    }
}


function updatePipe (i)
{
    $("."+i).css("left", distance);
}


function deletePipe (i)
{
    $("."+i).remove();
    minPipe++;
}

/***********************************************************************************************************************************
collision
***********************************************************************************************************************************/

function isCollided ()
{
    var collided = false;

    var bx1 = x;
    var bx2 = x + w;
    var by1 = y;
    var by2 = y + h;

    var px1, px2, py1, py2;

    for(var i = minPipe; i <= pipeCount; i++)
    {
        px1 = parseInt($("."+i).css("left"));
        px2 = parseInt($("."+i).css("left")) + parseInt($("."+i).css("width"));
        py1 = parseInt($("."+i).css("margin-top")) - 200;
        py2 = parseInt($("."+i).css("margin-top"));

        if(bx1 < px2 && px1 < bx2)
        {
            if(by1 < py1 || by2 > py2)
            {
                collided = true;
            }
        }
    }

    return collided;
}


var stop = false;


$(document).click(function() //the first click will start game and every click will cause bird to jump
{
    start = true;


    if(isCollided())
    {
        stop = true;
    }

    if(!stop)
    {
        jump();
    }
});
// "https://www.pngkey.com/png/detail/181-1811759_flappy-bird-pipes-png-transparent-download-8-bit.png"
