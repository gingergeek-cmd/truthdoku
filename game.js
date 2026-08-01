const grid = document.getElementById("grid");

const statements = [
    "The Earth is flat",
    "A triangle has 3 sides",
    "Water freezes at 0°C",
    "The Sun is a planet",
    "Cats are mammals",
    "London is in France",
    "2 + 2 = 4",
    "Penguins can fly",
    "The Moon orbits Earth",
    "Fire is cold",
    "A square has 4 sides",
    "Fish live underwater",
    "Jupiter is the largest planet",
    "Humans breathe oxygen",
    "The sky is green",
    "5 x 5 = 25"
];


let activeCard = null;
let startX = 0;
let startY = 0;



// Create squares

statements.forEach(text => {


    let square = document.createElement("div");

    square.className = "square";

    square.textContent = text;


    square.addEventListener("click", () => {

        openCard(square);

    });


    grid.appendChild(square);


});





function openCard(square){


    if(activeCard) return;


    square.style.visibility="hidden";


    activeCard = square;


    let card = document.createElement("div");

    card.className="expanded-card";

    card.textContent=square.textContent;


    document.body.appendChild(card);



    card.addEventListener("touchstart", e=>{

        startX=e.touches[0].clientX;
        startY=e.touches[0].clientY;

    });



    card.addEventListener("touchmove", e=>{


        let x=e.touches[0].clientX;
        let y=e.touches[0].clientY;


        let dx=x-startX;
        let dy=y-startY;


        card.style.transform =
        `
        translate(${dx}px, ${dy}px)
        rotate(${dx/12}deg)
        scale(1.05)
        `;



        if(dx>50){

            card.textContent="TRUE ✓\n\n"+square.textContent;

        }

        else if(dx<-50){

            card.textContent="FALSE ✗\n\n"+square.textContent;

        }

        else if(dy<-50){

            card.textContent="👑\n\n"+square.textContent;

        }

        else if(dy>50){

            card.textContent=square.textContent;

        }


    });



    card.addEventListener("touchend", e=>{


        let dx=e.changedTouches[0].clientX-startX;
        let dy=e.changedTouches[0].clientY-startY;



        if(dx>100){

            square.textContent="✓\n"+square.textContent;
            square.classList.add("true");

        }

        else if(dx<-100){

            square.textContent="✗\n"+square.textContent;
            square.classList.add("false");

        }

        else if(dy<-100){

            square.textContent="👑\n"+square.textContent;
            square.classList.add("crown");

        }



        closeCard(card);


    });


}



function closeCard(card){

    card.remove();

    activeCard.style.visibility="visible";

    activeCard=null;

}