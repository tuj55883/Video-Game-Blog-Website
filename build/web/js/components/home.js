function home () {

// ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
// 
// NetBeans menu option "Source - Format" will not work with the text inside of a 
// String, so you have to do this indentation manually with the editor. 

var content = `

        <h2>Join now to showcase your game!</h2>

            <p>
                If you are an independent developer that has been making games for years, 
                just starting your first one or just enjoy trying new games this is the place for
                you. This is the one stop destination to catch up on your inde game information.
                Come here to learn about new independently developed games
                and see what your favorite developers are working on. Our goal is
                to connect as many people as possible so you can expand your bubble and learn
                about new games and show people your own games. We want to connect independent
                developers with new audience to more easily get you game out there. Similar to how
                <a href="https://www.xbox.com/en-US/developers/id">ID@Xbox</a>
                makes it easier to make games, we want it to be easier to find and promote games.
                Join today to start showcasing your games or
                see what other people are working on.
                
                
                
            </p>
    
    
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        ele.innerHTML = content; // the HTML code specified just above...
        var imgCont = document.createElement("div");
        imgCont.classList.add('flexContainer'); // see styling in this file, above...
        ele.appendChild(imgCont);
        var img = document.createElement('img');
        
        img.src = 
        'pics/controller.jpg';

        img.style.width = "30%";
        imgCont.style.textAlign = "center";
        imgCont.appendChild(img);
        
        
        return ele;
        }