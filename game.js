const grid = document.getElementById("grid");


// create 16 squares

for(let i=0;i<16;i++){

    let square=document.createElement("div");

    square.className="square";

    square.dataset.state="unknown";


    let startX=0;


    // Touch start

    square.addEventListener(
        "touchstart",
        function(e){

            startX=e.touches[0].clientX;

        }
    );


    // Touch end

    square.addEventListener(
        "touchend",
        function(e){

            let endX=e.changedTouches[0].clientX;

            let difference=endX-startX;


            // swipe right

            if(difference>50){

                square.dataset.state="true";

                square.textContent="✓";

                square.className="square true";

            }


            // swipe left

            else if(difference<-50){

                square.dataset.state="false";

                square.textContent="✗";

                square.className="square false";

            }

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