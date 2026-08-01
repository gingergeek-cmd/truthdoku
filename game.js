const grid = document.getElementById("grid");
const preview = document.getElementById("swipe-preview");
const previewText = document.getElementById("preview-text");


// create 16 squares

for(let i=0;i<16;i++){

    let square=document.createElement("div");

    square.className="square";

    square.dataset.state="unknown";


    let startX=0;
    let currentX=0;


    // Touch start

    square.addEventListener(
        "touchstart",
        function(e){

            startX=e.touches[0].clientX;
            currentX=startX;

            square.classList.add("selected");

        }
    );


    // Move square with finger

    square.addEventListener(
        "touchmove",
        function(e){

            currentX=e.touches[0].clientX;

            let difference=currentX-startX;


            square.style.transform =
                `translateX(${difference}px) scale(1.15) rotate(${difference/15}deg)`;


            // Show preview

            if(difference>50){

                previewText.textContent="TRUE ✓";
                preview.className="show true-preview";

            }

            else if(difference<-50){

                previewText.textContent="FALSE ✗";
                preview.className="show false-preview";

            }

            else{

                preview.className="";

            }

        }
    );


    // Touch end

    square.addEventListener(
        "touchend",
        function(e){

            let difference=currentX-startX;


            square.classList.remove("selected");


            // TRUE

            if(difference>100){

                square.dataset.state="true";

                square.textContent="✓";

                square.className="square true";

            }


            // FALSE

            else if(difference<-100){

                square.dataset.state="false";

                square.textContent="✗";

                square.className="square false";

            }


            // Cancel swipe

            else{

                square.style.transform="";

            }


            preview.className="";

        }
    );



    // double tap crown

    square.addEventListener(
        "dblclick",
        function(){

            if(square.textContent==="👑"){

                square.textContent="";

                square.classList.remove("crown");

            }

            else{

                square.textContent="👑";

                square.classList.add("crown");

            }

        }
    );


    grid.appendChild(square);

}