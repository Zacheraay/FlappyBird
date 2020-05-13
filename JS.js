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
        h += v;

        updateBird();
    }
}

/***********************************************************************************************************************************
Bird
***********************************************************************************************************************************/

var maxV = 200;
var h;
var v = 1;
var g = .02;


function createBird ()
{
    var bird = $("<bDiv></bDiv>")
        .attr("id", "bird");
    $("#gameWindow").append(bird);

    h = parseInt(bird.css("margin-top"));

    wait = setInterval(idle, 10);
}


function updateBird ()
{
    $("#bird").css("margin-top", h);
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

    h += v;
}


function rebound ()
{
    if(h < 0)
    {
        h = 0;
        v = 0;
    }
}


function ground ()
{
    if(h + parseInt($("#bird").css("height")) > 800)
    {
        clearInterval(fall);
        clearInterval(init);
        clearInterval(move);
        h = 800 - parseInt($("#bird").css("height"));
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
    for(var i = minPipe; i <= minPipe + $(".lPipe").length - 1; i++)
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
game checks
***********************************************************************************************************************************/





$(document).click(function() //the first click will start game and every click will cause bird to jump
{
    start = true;
    jump();
});
// "https://www.pngkey.com/png/detail/181-1811759_flappy-bird-pipes-png-transparent-download-8-bit.png"
