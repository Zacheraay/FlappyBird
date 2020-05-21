/***********************************************************************************************************************************
document wait/start
***********************************************************************************************************************************/

$(document).ready(function ()
{
    setGame();
});


var start;
var hold = false;


function idle ()
{
    if(start)
    {
        clearInterval(wait);
        initScore();
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


function setGame ()
{
    $("#deathScreen").hide();
    $("#gameWindow").empty();

    start = false;
    died = false;

    pipesPassed = 0;
    pipeCount = 0;
    minPipe = 1;

    g = .02;

    createBird();
}

/***********************************************************************************************************************************
Bird
***********************************************************************************************************************************/

var maxV = 200;
var h = 50;
var w = 60;
var x = 200;
var y;
var v;
var died;


function createBird ()
{
    var bird = $("<bDiv></bDiv>")
    bird
        .attr("id", "bird")
        .css("width", w)
        .css("height", h)
        .css("left", x);
    $("#gameWindow").append(bird);

    y = 300;
    v = 1;

    wait = setInterval(idle, 10);
}


function updateBird ()
{
    $("#bird").css("margin-top", y);
}


function checkBird ()
{
    rebound();
    gravity();
    ground();
    updateBird();
    updateScore();
    isCollided();
}


function jump ()
{
    if(!died)
    {
        v = -7;
    }
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
        y = 800 - parseInt($("#bird").css("height"));
        updateBird();
        dead (true);
        died = true;
    }
}


function dead (hasFallen)
{
    clearInterval(init);
    clearInterval(move);
    if(hasFallen)
    {
        hold = true;
        clearInterval(fall);
        $("#deathScreen").show();
        $("#gameScore").html($("#score").html());
    }
}


/***********************************************************************************************************************************
Pipes
***********************************************************************************************************************************/

var pipeCount;
var distance;
var minPipe;
var pipesPassed;


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

    if(parseInt($("."+i).css("left")) == 200)
    {
        pipesPassed++;
    }
}


function deletePipe (i)
{
    $("."+i).remove();
    minPipe++;
}

/***********************************************************************************************************************************
Game Checks
***********************************************************************************************************************************/

function isCollided ()
{
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
                dead(false);
                died = true;
            }
        }
    }
}



$(document).mousedown(function()
{
    if(!hold)
    {
        start = true;
        jump();
    }
});




$(document).mouseup(function()
{
    if(restart)
    {
        hold = false;
        restart = false;
    }
});



/***********************************************************************************************************************************
Score/postgame
***********************************************************************************************************************************/

var restart = false;


function initScore ()
{
    var score = $("<score></score>");
    score
        .attr("id", "score");

    $("#gameWindow").append(score);
}


function updateScore ()
{
    $("#score").html(pipesPassed);
}


$("#restart").mouseover(function()
{
    $("#restart")
        .css("border", "3px solid white")
        .css("color", "white");
});


$("#restart").mouseleave(function()
{
    $("#restart")
        .css("border", "3px solid black")
        .css("color", "black");
});


$("#restart").mousedown(function()
{
    setGame();
    restart = true;
});
