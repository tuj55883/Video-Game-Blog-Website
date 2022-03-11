function blog() {

// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
var content = ` 
      <h2>Table info:</h2>
            <p>
                I plan for the table to be have a description of the game, url point to a photo of the game and
                fields for a nullable date, a nullable price, genre, and person who made it.
                
                
                
            </p>
            <h2>Info about me:</h2>
            <p>
                I only have a little bit of experience in web desgin. I took a technology class
                that's second half was about web design. I used dreamweaver to make a basic website with
                pictures links and basic text. We also published it through dreamweaver to the temple
                astro site before that got taken down.
                Outside of that I don't have much html or css experience
                at all but I do have a good amount of general coding that can come in handy.
                
                
                
            </p>
            <h2> Info about homework 1:</h2>
            <p>
                This homework wasn't bad at all. Most of it I have a little bit of
                experience doing from my one class. The html and css we used is pretty simple.
                The only thing that gave me a bit of trouble was the nav bar being responsive but
                I remembered you went over it on you website. I just reference back to the
                material and found an easy solution. Overall a good and easy homework!
                
                
                
            </p>
            <h2> Info about homework 2:</h2>
            <p>
                Like you said this week was pretty easy for homework. The only hiccups were some css
                styling sheet difference from my orginal. Overall though it was quite valuable to just
                keep going through these files to get a better understanding of how all it works. Greatly
                increasing my understanding of what we are learning.
                
            </p>
            
            <h2> JS Object Homework:</h2>
            <p>
                Homework was definitly difficult this week. Mostly because it was just a bunch of stuff
                we had to do. It took quite a while though. Other than that it was a pretty good homework
                to understand objects in javascript a lot better. Helped me practice writing functions
                and basic coding stuff. Overall, a long but helpful homework.
                
            </p>
            <h2> Database:</h2>
            <p>
                My database experience is pretty much non existent. The only real database knowledge I have
                is the one class all people in cs have to take which is about databases. Which that class is more
                about the structures of databases rather than actual database building. I have zero experience
                with SQL, Oracle or any other database software. Though this class seems to be teaching me a lot
                of useful information about them.

            </p>
            <p>
                The homework was fairly easy but it was all really useful to learn. The idea of purposely
                making errors actually really helped me understand the mySQL workbench a lot better. It was a
                really useful assignment and I felt it really helped in general. Though again it was easy, but
                I am definitly not upset about easy assignments. Click <a target="here" href='toal_database.pdf'>here</a> to see my database document. 
            </p>
    
            <h2> Reverse Sort:</h2>
            <p>
               Oh my god. This was easily the most hard homework we have had. I don't know if it was just me
               being dumb(which it very much could be) or it was very difficult. It was pretty useful info but
               it somewhat felt unneccsary. I feel this would be an assignment in a regular coding class instead
               of a web applications class. Just glad to have it done.

            </p>
    
            <h2> Tutorial Proposal:</h2>
            <p>
               This wasn't that bad of an assignment. Im still not 100% on what I want to do but
               I definitly got the building blocks laid out. I just didnt want to spend to much
               time coding and stuff when I still gotta do the homework for the week. Again wasnt
               bad and helped me visualize what I want to do before coding it all.

            </p>
    
            <h2> Web API:</h2>
            <p>
               I have never done any serverside code before now. This is the only time I have
               even really interacted with a server. It was overwhelming at first but after
               the homework and lab, I have a pretty good grasp.
               
            </p>
            <p>
            I found this homework very managable and really helpful to get an understanding on web APIs.
            It really helped me understand how helpful making reusable compnents are. Overall though
            this really helped me understand all the information we are retrieving from our sql table.
            Also, how the information is retrieved and processed and how to apply it to things. It was not too hard
            but not to easy either.
            </p>
            <p>
            Click <a target="_blank" href="WebAPI_db_errors.pdf">here</a> to see my error document <br>
            Click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a> for my List Users Web API<br>
            Click <a target="_blank" href="webAPIs/listOtherAPI.jsp">here</a> for my List Game API<br>
            </p>
    
            <h2> Logon:</h2>
            <p>
               This was a fairly easy lab but I would say that was mostly because the labs set me up
               with a lot of the tools and information I needed. It was good being able to build upon what we
               did from lab and implement it into user side code. I found the whole thing really cool too because
               we log on and off of websites everyday and it is fun to learn the code behind it. Overall, a good simple
               homework that really was fun to do and important too learn. I am looking forward to the registar homwork stuff.
               
            </p>
            <p>
            Click <a target="_blank" href="webAPIs/logonAPI.jsp?userEmail=test@gmail.com&userPw=password">here</a> to see my logon API in action <br>
            Click <a target="_blank" href="webAPIs/logoffAPI.jsp">here</a> to see my logoff API in action <br>
            Click <a target="_blank" href="webAPIs/getProfileAPI.jsp">here</a> to see my getProfile API in action <br>
            Click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a> for my List Users Web API<br>
            </p>
            <h2> Tutorial:</h2>
            <p>
               This one defitily took a while. I definitly saved it till last minute so thats on me. Overall, I feel 
               like it was important to do because it was good doing something from scratch with no real guide lines.
               It helped me get and idea of the making a website process from a personal level instead of an assignment
               level. It wasn't that bad to do, if anything it felt like a lot to do all the w3 try it stuff but nothing
               was too difficult. Other than coming up with an idea, I definitly stuggled with that but hopefully it is good
               enough. 
            </p>
            <h2> Update:</h2>
            <p>
               The update homework really wasn't that bad. With all the sample code supplied and what we did in labs, it
               was pretty easy figuring out what to do. When I got stuck I had a lot of code to look back too which overall
               made it really helpful. I find this whole database stuff really cool because we user these same tools on different
               websites and we are making those same ones for ours. Its just a neat thing to learn.
            </p>
    
            <h2> Delete:</h2>
            <p>
                Super easy homework once I figured out what to do. Very simple to do but still had useful information that I
                will probably use sometime down the road. Just helps build upon what we already can do with databases and stuff like that.
                Overall really liked this one because it was short and simple.
            </p>

    `;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        return ele;
        }