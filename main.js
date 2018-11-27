//$(document).ready(function()
(function ( $ ) 
{

    $.fn.start_game = function()
    {
        var is_init_game = false;
        var score = 0;
        var bestscore = 0;
        var cpt = 0;
        var tab = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768];
        var minX = 0;
        var minY = 0;
        var maxX = 4;
        var maxY = 4;
        var tab_val = new Array(4);

        var strEmpty = " ";

        init_html();

        // Get the best score + display
        bestscore = readCookie('BestScore2048');
        if(bestscore==null)
            bestscore=0;
        $("#best").html(bestscore);

        for(var k=0; k < maxX; k++)
        {
            tab_val[k] = new Array(4);
            for(var l=0; l < maxY; l++)
            {
                tab_val[l] = 0;
            }
        }

        // **********************************************************************

        $("#btnPlay").click(function()
        {
            init_game();

            // Get the best score + display
            bestscore = readCookie('BestScore2048');
            if(bestscore==null)
                bestscore=0;
            $("#best").html(bestscore);
        });

		$("#btnLeft").click(function()
        {
			
			event.keyCode = 37;
			Key_press(event);
		});
		$("#btnUp").click(function()
        {
			event.keyCode = 38;
			Key_press(event);
		});
		$("#btnRight").click(function()
        {
			event.keyCode = 39;
			Key_press(event);
		});
		$("#btnDown").click(function()
        {
			event.keyCode = 40;
			Key_press(event);
		});

		//document.addEventListener("keypress", function (event)
		$(document).on("keyup", "html", function(event) 
        {
            Key_press(event);
        });


    function init_html()
    {
        
        //<div>\
        //<center><a href=\"https://en.wikipedia.org/wiki/2048_(video_game)\">Rules</a></center>\
        //</div>\

       // alert("init_html");
//$("#div_2048").append("<html> coucou </html>");
//return;
    var str_html = "\
    <div class=\"container\">\
    <div><center>\
    <img src=\"2048_logo.png\" alt=\"2048_logo\" height=\"100\" weight=\"100\">\
    </center></div>\
    <div><left>\
        <div size=\"150\"><label class='text' for=\"Score\">Your score : </label>\
        <b  class='text' id=\"score\">0</b></div>\
        <div size=\"150\"><label  class='text' for=\"Best\">Best score : </label>\
        <b  class='text' id=\"best\">0</b></div>\
    </left></div>\
    <br>\
    <center><button class='button' id=\"btnPlay\" >New Game</button></center>\
	<center>\
		<button class='button' id=\"btnLeft\" >Left</button>\
		<button class='button' id=\"btnRight\" >Right</button>\
		<button class='button' id=\"btnUp\" >Up</button>\
		<button class='button' id=\"btnDown\" >Down</button>\
	</center>\
    <br>\
    <div class=\"table_container\">\
        <TABLE border=1 cellspacing=2 cellpadding=2 >\
            <tr>\
                <td id=\"00\" class=\"c0\" ></td>\
                <td id=\"01\" class=\"c0\" ></td>\
                <td id=\"02\" class=\"c0\" ></td>\
                <td id=\"03\" class=\"c0\" ></td>\
            </tr>\
            <tr>\
                <td id=\"10\" class=\"c0\" ></td>\
                <td id=\"11\" class=\"c0\" ></td>\
                <td id=\"12\" class=\"c0\" ></td>\
                <td id=\"13\" class=\"c0\" ></td>\
            </tr>\
            <tr>\
                <td id=\"20\" class=\"c0\" ></td>\
                <td id=\"21\" class=\"c0\" ></td>\
                <td id=\"22\" class=\"c0\" ></td>\
                <td id=\"23\" class=\"c0\" ></td>\
            </tr>\
            <tr>\
                <td id=\"30\" class=\"c0\" ></td>\
                <td id=\"31\" class=\"c0\" ></td>\
                <td id=\"32\" class=\"c0\" ></td>\
                <td id=\"33\" class=\"c0\" ></td>\
            </tr>\
        </TABLE><br>\
    </div>\
</div>";

$("#div_2048").append(str_html);
    }

    // **********************************************************************
    //function init_game()
    //$.fn.init_game = function()
    function init_game()
    {
        is_init_game = true;
        score = 0;
        $("#score").html(score);
        for(var x=0;x<4;x++)
        {
            for(var y=0;y<4;y++)
            {
                $("#"+x+""+y).html(strEmpty);
                $("#" + x + "" + y).removeClass();
                $("#" + x + "" + y).addClass("c0");
            }
        }
        my_random();
        my_random();
    }

    // **********************************************************************
    //function is_tab_space()
    //$.fn.is_tab_space = function()
    function is_tab_space()
    {
        var ret = false;
        for(var x=0;x<4;x++)
        {
            for(var y=0;y<4;y++)
            {
                if($("#" + x + "" + y).html() == strEmpty)
                {
                    ret = true;
                    break;
                }
            }
        }
        return ret;
    }

    // **********************************************************************
    //function nbre_tab_space()
    //$.fn.nbre_tab_space = function()
    function nbre_tab_space()
    {
        var ret = 0;
        for(var x=0;x<4;x++)
        {
            for(var y=0;y<4;y++)
            {
                if($("#" + x + "" + y).html() == strEmpty)
                {
                    ret++;
                }
            }
        }
        return ret;
    }

    // **********************************************************************
    //function my_random()
    //$.fn.my_random = function()
    function my_random()
    {
        var ret = false;
        if ( is_tab_space() == true )
        {
            ret = true;
            var x = 0;
            var y = 0;
            var z =  Math.floor((Math.random() * 10) + 1);
            do
            {
                x = Math.floor((Math.random() * 4) + 0);
                y = Math.floor((Math.random() * 4) + 0);
            }
            while ( my_get_val(x, y) != strEmpty );

            var index_val = 0;
            if(z > 9)
                index_val = 1;

            $("#" + y + "" + x).html(tab[index_val]);
            $("#" + y + "" + x).removeClass();
            $("#" + y + "" + x).addClass("c"+tab[index_val]);

            //console.log("RAND : " + (x)+"-"+(y) + " -> " + ($("#"+(y)+""+(x)).html()) + " -> "+ my_get_val(x, y) );
        }

        return ret;
    }

    // **********************************************************************
    //function my_get_val(x, y)
    //$.fn.my_get_val = function(x, y)
    function my_get_val(x, y)
    {
        return $("#"+y+""+x).html();
    }

    // **********************************************************************
    //function Key_press(event)
    //$.fn.Key_press = function(event)
    function Key_press(event)
    {
        var is_valid_key = false;
        var is_fusioned = false;
        var is_checked = false;
        var is_play_random = false;
        var fusion_score = 0;

        if( (event.key == "ArrowUp") || (event.key == "ArrowDown") || (event.key == "ArrowLeft") || (event.key == "ArrowRight")
			|| (event.keyCode == 37)|| (event.keyCode == 38) || (event.keyCode == 39)|| (event.keyCode == 40)
		  )
        {
            is_valid_key = true;
            if(is_init_game == false)
            {
                alert("Game not initialized !");
                return;
            }
        }

        if (is_valid_key == true)
        {
            if((event.key == "ArrowUp") || (event.keyCode == 38) || (event.keyCode == 90))
            {
                for(var z=0;z<4;z++)
                {
                    for(var x=0;x<4;x++)
                    {
                        for(var y=0;y<3;y++)
                        {
                            if( my_get_val(x, y) == strEmpty ) //&& ( my_get_val(x, y) != my_get_val(x, y+1)))
                            {
                                if( my_get_val(x, y) != my_get_val(x, y+1))
                                {
                                    var res_play_random = REMONTE_CELL(x, y);
                                    if(res_play_random == true)
                                        is_play_random = true;
                                }
                                else
                                {
                                    //FUSIONNE_CELL_HAUT(x, y);
                                    //is_fusioned = true;
                                    //fusion_score += (my_get_val(x, y) * 1);
                                }
                            }
                            else
                            {
                                if( my_get_val(x, y) != my_get_val(x, y+1))
                                {
                                    if (y == 0)
                                        continue;
                                }
                                else
                                if( my_get_val(x, y) == my_get_val(x, y+1))
                                {
                                    FUSIONNE_CELL_HAUT(x, y);
                                    z++;
                                    is_fusioned = true;
                                    fusion_score += (my_get_val(x, y) * 1);
                                    is_play_random = true;
                                }
                            }
                        }
                    }
                }

            }
            else if ((event.key == "ArrowDown") || (event.keyCode == 40) || (event.keyCode == 83))
            {
                for(var z=0;z<4;z++)
                {
                    for(var x=0;x<4;x++)
                    {
                        for(var y=3;y>0;y--)
                        {
                            if( my_get_val(x, y) == strEmpty )
                            {
                                if( my_get_val(x, y) != my_get_val(x, y-1))
                                {
                                    var res_play_random = BAISSE_CELL(x, y);
                                    if(res_play_random == true)
                                        is_play_random = true;
                                }
                                else
                                {
                                    //FUSIONNE_CELL_BAS(x, y);
                                    //is_fusioned = true;
                                    //fusion_score += (my_get_val(x, y) * 1);
                                }
                            }
                            else
                            {
                                if( my_get_val(x, y) != my_get_val(x, y-1))
                                {
                                    if (y == 3)
                                        continue;
                                }
                                else
                                {
                                    FUSIONNE_CELL_BAS(x, y);
                                    z++;
                                    is_fusioned = true;
                                    fusion_score += (my_get_val(x, y) * 1);
                                    is_play_random = true;
                                }
                            }
                            /*
                            $("#"+(y)+""+(x)).html( $("#"+(y+1)+""+(x)).html() );
                            $("#"+(y)+""+(x)).addClass( "c"+ $("#"+(y+1)+""+(x)).html() );
                            $("#"+(y+1)+""+(x)).html("");
                            $("#"+(y+1)+""+(x)).removeClass();
                            $("#"+(y+1)+""+(x)).addClass("c0");
                            */
                        }
                    }
                }
            }
            else if ((event.key == "ArrowLeft") || (event.keyCode == 37) || (event.keyCode == 81))
            {
                for(var z=0;z<4;z++)
                {
                    for(var x=0;x<3;x++)
                    {
                        for(var y=0;y<4;y++)
                        {
                            if( my_get_val(x, y) == strEmpty )
                            {
                                if( my_get_val(x, y) != my_get_val(x+1, y))
                                {
                                    var res_play_random = GAUCHE_CELL(x, y);
                                    if(res_play_random == true)
                                        is_play_random = true;
                                }
                                else
                                {
                                    //FUSIONNE_CELL_GAUCHE(x, y);
                                    //is_fusioned = true;
                                    //fusion_score += (my_get_val(x, y) * 1);
                                }
                            }
                            else
                            {
                                if( my_get_val(x, y) != my_get_val(x+1, y))
                                {
                                    if (x == 0)
                                        continue;
                                }
                                else
                                {
                                    FUSIONNE_CELL_GAUCHE(x, y);
                                    z++;
                                    is_fusioned = true;
                                    fusion_score += (my_get_val(x, y) * 1);
                                    is_play_random = true;
                                }
                            }
                            /*
                            $("#"+(y)+""+(x)).html( $("#"+(y)+""+(x+1)).html() );
                            $("#"+(y)+""+(x)).addClass( "c"+ $("#"+(y)+""+(x+1)).html() );
                            $("#"+(y)+""+(x+1)).html("");
                            $("#"+(y)+""+(x+1)).removeClass();
                            $("#"+(y)+""+(x+1)).addClass("c0");
                            */
                        }
                    }
                }
            }
            else if ((event.key == "ArrowRight") || (event.keyCode == 39) || (event.keyCode == 68))
            {
                for(var z=0;z<4;z++)
                {
                    for(var x=3;x>0;x--)
                    {
                        for(var y=0;y<4;y++)
                        {
                            if( my_get_val(x, y) == strEmpty )
                            {
                                if( my_get_val(x, y) != my_get_val(x-1, y))
                                {
                                    var res_play_random = DROITE_CELL(x, y);
                                    if(res_play_random == true)
                                        is_play_random = true;
                                }
                                else
                                {
                                    //FUSIONNE_CELL_DROITE(x, y);
                                    //is_fusioned = true;
                                    //fusion_score += (my_get_val(x, y) * 1);
                                }
                            }
                            else
                            {
                                if( my_get_val(x, y) != my_get_val(x-1, y))
                                {
                                    if (x == 3)
                                        continue;
                                }
                                else
                                {
                                    FUSIONNE_CELL_DROITE(x, y);
                                    z++;
                                    is_fusioned = true;
                                    fusion_score += (my_get_val(x, y) * 1);
                                    is_play_random = true;
                                }
                            }
                            /*
                            $("#"+(y)+""+(x)).html( $("#"+(y)+""+(x+1)).html() );
                            $("#"+(y)+""+(x)).addClass( "c"+ $("#"+(y)+""+(x+1)).html() );
                            $("#"+(y)+""+(x+1)).html("");
                            $("#"+(y)+""+(x+1)).removeClass();
                            $("#"+(y)+""+(x+1)).addClass("c0");
                            */
                        }
                    }
                }
            }

        }

        if (is_valid_key == true)
        {
            // **********************
            if(is_fusioned == true)
            {
                score += fusion_score;
                $("#score").html(score);
            }

            if(is_play_random == true)
            {
                //$(document).wait(1000);
                //animate({}, 10000).
                my_random();
            }

            if ( nbre_tab_space() < 1 )
            {
                is_checked = is_Check_tab();
                if(is_checked == false)
                {
                    alert ("You loose !");
                    is_init_game = false;

                    //TO DO
                    if(score > bestscore)
                    {
                        alert("You're the best score !");
                        createCookie('BestScore2048', score, 365); 
                        //_COOKIE['BestScore2048'] = score;
                    }
                }
            }
        }

    }


    function createCookie(name,value,days) 
    {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
    
    function readCookie(name) 
    {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    function eraseCookie(name) 
    {
        createCookie(name,"",-1);
    }

    function sleep(milliseconds) 
    {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) 
        {
            if ((new Date().getTime() - start) > milliseconds){
            break;
            }
        }
    }

    function is_Check_tab()
    {
        var ret = false;
        // TO DO
        for(var x=0;x<4;x++)
        {
            for(var y=0;y<4;y++)
            {

                if( (my_get_val(x,y) == my_get_val(x,y+1)) 
                 || (my_get_val(x,y) == my_get_val(x+1,y))
                  )
                {
                    ret = true;
                    return ret;
                    //break;
                }
            }
        }

        return ret;
    }

    // **********************************************************************
    function REMONTE_CELL(x, y)
    {
        var ret = false;
        //console.log("1-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
        //console.log("1-COORD2 : " + (y+1)+""+(x) + " -> " + $("#"+(y+1)+""+(x)).html() + " -> " + my_get_val(x, y+1));
        if ($("#"+(y+1)+""+(x)).attr('class') == "c0") //(($("#"+(y+1)+""+(x)).html() == 0)
        {
            //console.log("1-REMONTE_CELL - C0");
            //$("#"+(y)+""+(x)).html( strEmpty );
            //ret = true;
        }
        else
        {
            //console.log("1-REMONTE_CELL");
            //console.log("1-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
            //console.log("1-COORD2 : " + (y+1)+""+(x) + " -> " + $("#"+(y+1)+""+(x)).html() + " -> " + my_get_val(x, y+1));
            $("#"+(y)+""+(x)).html( $("#"+(y+1)+""+(x)).html() );
            ret = true;
        }
        $("#"+(y)+""+(x)).addClass( "c"+ $("#"+(y+1)+""+(x)).html() );
        $("#"+(y+1)+""+(x)).html(strEmpty);
        $("#"+(y+1)+""+(x)).removeClass();
        $("#"+(y+1)+""+(x)).addClass("c0");
        return ret;
    }
    // **********************************************************************
    function FUSIONNE_CELL_HAUT(x, y)
    {
        var ret = false;
        //console.log("2-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
        //console.log("2-COORD2 : " + (y+1)+""+(x) + " -> " + $("#"+(y+1)+""+(x)).html() + " -> " + my_get_val(x, y+1));
        if ($("#"+(y+1)+""+(x)).attr('class') == "c0") //if ($("#"+(y+1)+""+(x)).html() == 0)
        {
            $("#"+(y)+""+(x)).html( strEmpty );
            //ret = true;
        }
        else
        {
            $("#"+(y)+""+(x)).html( my_get_val(x, y+1) * 2 );
            $("#"+(y)+""+(x)).addClass( "c"+ (my_get_val(x, y)*2) );
            //ret = true;
        }

        $("#"+(y+1)+""+(x)).html(strEmpty);
        $("#"+(y+1)+""+(x)).removeClass();
        $("#"+(y+1)+""+(x)).addClass("c0");
        return ret;
    }

    // **********************************************************************
    function BAISSE_CELL(x, y)
    {
        var ret = false;
        //console.log("1-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
        //console.log("1-COORD2 : " + (y+1)+""+(x) + " -> " + $("#"+(y+1)+""+(x)).html() + " -> " + my_get_val(x, y+1));
        if ($("#"+(y-1)+""+(x)).attr('class') == "c0") //if ($("#"+(y-1)+""+(x)).html() == 0)
        {
            $("#"+(y)+""+(x)).html( strEmpty );
            //ret = true;
        }
        else
        {
            //console.log("2-BAISSE_CELL");
            //console.log("2-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
            //console.log("2-COORD2 : " + (y-1)+""+(x) + " -> " + $("#"+(y-1)+""+(x)).html() + " -> " + my_get_val(x, y-1));
            $("#"+(y)+""+(x)).html( $("#"+(y-1)+""+(x)).html() );
            ret = true;
        }
        $("#"+(y)+""+(x)).addClass( "c"+ $("#"+(y-1)+""+(x)).html() );
        $("#"+(y-1)+""+(x)).html(strEmpty);
        $("#"+(y-1)+""+(x)).removeClass();
        $("#"+(y-1)+""+(x)).addClass("c0");
        return ret;
    }
    // **********************************************************************
    function FUSIONNE_CELL_BAS(x, y)
    {
        var ret = false;
        //console.log("2-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
        //console.log("2-COORD2 : " + (y+1)+""+(x) + " -> " + $("#"+(y+1)+""+(x)).html() + " -> " + my_get_val(x, y+1));
        if ($("#"+(y-1)+""+(x)).attr('class') == "c0") //if ($("#"+(y-1)+""+(x)).html() == 0)
        {
            $("#"+(y)+""+(x)).html( strEmpty );
            //ret = true;
        }
        else
        {
            $("#"+(y)+""+(x)).html( my_get_val(x, y-1) * 2 );
            $("#"+(y)+""+(x)).addClass( "c"+ (my_get_val(x, y)*2) );
            //ret = true;
        }

        $("#"+(y-1)+""+(x)).html(strEmpty);
        $("#"+(y-1)+""+(x)).removeClass();
        $("#"+(y-1)+""+(x)).addClass("c0");
        return ret;
    }


    // **********************************************************************
    function GAUCHE_CELL(x, y)
    {
        var ret = false;
        //console.log("1-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
        //console.log("1-COORD2 : " + (y+1)+""+(x) + " -> " + $("#"+(y+1)+""+(x)).html() + " -> " + my_get_val(x, y+1));
        if ($("#"+(y)+""+(x+1)).attr('class') == "c0") //if ($("#"+(y)+""+(x+1)).html() == 0)
        {
            $("#"+(y)+""+(x)).html( strEmpty );
            //ret = true;
        }
        else
        {
            //console.log("3-GAUCHE_CELL");
            //console.log("3-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
            //console.log("3-COORD2 : " + (y)+""+(x+1) + " -> " + $("#"+(y)+""+(x+1)).html() + " -> " + my_get_val(x+1, y));
            $("#"+(y)+""+(x)).html( $("#"+(y)+""+(x+1)).html() );
            ret = true;
        }
        $("#"+(y)+""+(x)).addClass( "c"+ $("#"+(y)+""+(x+1)).html() );
        $("#"+(y)+""+(x+1)).html(strEmpty);
        $("#"+(y)+""+(x+1)).removeClass();
        $("#"+(y)+""+(x+1)).addClass("c0");
        return ret;
    }
    // **********************************************************************
    function FUSIONNE_CELL_GAUCHE(x, y)
    {
        var ret = false;
        //console.log("2-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
        //console.log("2-COORD2 : " + (y+1)+""+(x) + " -> " + $("#"+(y+1)+""+(x)).html() + " -> " + my_get_val(x, y+1));
        if ($("#"+(y)+""+(x+1)).attr('class') == "c0") //if ($("#"+(y)+""+(x+1)).html() == 0)
        {
            $("#"+(y)+""+(x)).html( strEmpty );
            //ret = true;
        }
        else
        {
            $("#"+(y)+""+(x)).html( my_get_val(x+1, y) * 2 );
            $("#"+(y)+""+(x)).addClass( "c"+ (my_get_val(x, y)*2) );
            //ret = true;
        }

        $("#"+(y)+""+(x+1)).html(strEmpty);
        $("#"+(y)+""+(x+1)).removeClass();
        $("#"+(y)+""+(x+1)).addClass("c0");
        return ret;
    }

    // **********************************************************************
    function DROITE_CELL(x, y)
    {
        var ret = false;
        //console.log("1-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
        //console.log("1-COORD2 : " + (y+1)+""+(x) + " -> " + $("#"+(y+1)+""+(x)).html() + " -> " + my_get_val(x, y+1));
        if ($("#"+(y)+""+(x-1)).attr('class') == "c0") //if ($("#"+(y)+""+(x-1)).html() == 0)
        {
            $("#"+(y)+""+(x)).html( strEmpty );
            //ret = true;
        }
        else
        {
            //console.log("4-DROITE_CELL");
            //console.log("4-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
            //console.log("4-COORD2 : " + (y)+""+(x-1) + " -> " + $("#"+(y)+""+(x-1)).html() + " -> " + my_get_val(x-1, y));
            $("#"+(y)+""+(x)).html( $("#"+(y)+""+(x-1)).html() );
            ret = true;
        }
        $("#"+(y)+""+(x)).addClass( "c"+ $("#"+(y)+""+(x-1)).html() );
        $("#"+(y)+""+(x-1)).html(strEmpty);
        $("#"+(y)+""+(x-1)).removeClass();
        $("#"+(y)+""+(x-1)).addClass("c0");
        return ret;
    }
    // **********************************************************************
    function FUSIONNE_CELL_DROITE(x, y)
    {
        var ret = false;
        //console.log("2-COORD1 : " + (y)+""+(x) + " -> " + $("#"+(y)+""+(x)).html() + " -> " + my_get_val(x, y));
        //console.log("2-COORD2 : " + (y+1)+""+(x) + " -> " + $("#"+(y+1)+""+(x)).html() + " -> " + my_get_val(x, y+1));
        if ($("#"+(y)+""+(x-1)).attr('class') == "c0") //if ($("#"+(y)+""+(x-1)).html() == 0)
        {
            $("#"+(y)+""+(x)).html( strEmpty );
            //ret = true;
        }
        else
        {
            $("#"+(y)+""+(x)).html( my_get_val(x-1, y) * 2 );
            $("#"+(y)+""+(x)).addClass( "c"+ (my_get_val(x, y)*2) );
            //ret = true;
        }

        $("#"+(y)+""+(x-1)).html(strEmpty);
        $("#"+(y)+""+(x-1)).removeClass();
        $("#"+(y)+""+(x-1)).addClass("c0");
        return ret;
    }

};

}( jQuery ));

$(document).start_game();
