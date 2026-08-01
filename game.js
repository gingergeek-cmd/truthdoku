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

function fitText(element) {

    let fontSize = 1.5; // starting size in rem

    element.style.fontSize = fontSize + "rem";


    while (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    ) {

        fontSize -= 0.05;

        element.style.fontSize = fontSize + "rem";


        if(fontSize <= 0.6) {
            break;
        }

    }

}
// Create squares

statements.forEach(text => {

    let square = document.createElement("div");

    square.className = "square";

square.textContent = text;

fitText(square);


    square.addEventListener("click", () => {

square.addEventListener("click", () => {
    openCard(square);
});

        openCard(square);

    });


    grid.appendChild(square);

});





function openCard(square){


    if(activeCard) return;


    square.style.visibility = "hidden";

    activeCard = square;


    let card = document.createElement("div");

    card.className = "expanded-card";

    card.textContent = square.textContent;


    card.addEventListener("click", e => {
        e.stopPropagation();
    });


    document.body.appendChild(card);



    card.addEventListener("touchstart", e => {

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

    });




    card.addEventListener("touchmove", e => {


        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;


        let dx = x - startX;
        let dy = y - startY;



        // Card tilt

        card.style.transform =
        `
        translate(-50%, -50%)
        rotate(${dx/15}deg)
        scale(1.05)
        `;



        // TRUE preview

        if(dx > 50){

            card.classList.add("preview-true");
            card.classList.remove(
                "preview-false",
                "preview-crown"
            );

            card.textContent =
            "TRUE ✓\n\n" + square.textContent;

        }



        // FALSE preview

        else if(dx < -50){

            card.classList.add("preview-false");
            card.classList.remove(
                "preview-true",
                "preview-crown"
            );

            card.textContent =
            "FALSE ✗\n\n" + square.textContent;

        }



        // CROWN preview

        else if(dy < -50){

            card.classList.add("preview-crown");
            card.classList.remove(
                "preview-true",
                "preview-false"
            );

            card.textContent =
            "👑\n\n" + square.textContent;

        }



        // Cancel preview

        else if(dy > 50){

            card.classList.remove(
                "preview-true",
                "preview-false",
                "preview-crown"
            );

            card.textContent = square.textContent;

        }


    });






    card.addEventListener("touchend", e => {


        let dx = e.changedTouches[0].clientX - startX;
        let dy = e.changedTouches[0].clientY - startY;



// Remove previous answer
square.classList.remove(
    "true",
    "false",
    "crown"
);


// Remove old symbols
square.textContent = square.textContent
    .replace("✓\n","")
    .replace("✗\n","")
    .replace("👑\n","");


// Apply new answer

if(dx > 100){

    square.textContent =
    "✓\n" + square.textContent;

    square.classList.add("true");

}

else if(dx < -100){

    square.textContent =
    "✗\n" + square.textContent;

    square.classList.add("false");

}

else if(dy < -100){

    square.textContent =
    "👑\n" + square.textContent;

    square.classList.add("crown");

}

fitText(square);
        closeCard(card);


    });


}





function closeCard(card){

    card.remove();


    activeCard.style.visibility = "visible";


    activeCard = null;

}