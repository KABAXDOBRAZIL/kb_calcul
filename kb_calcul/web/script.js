document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("menuContainer").style.display = "none";
    document.getElementById("closeCalcul").addEventListener("click", closeCalcul);
    let display = document.querySelector(".overlap .text-wrapper");
    let buttons = document.querySelectorAll(".grey-btn button, .black-btn button");
    let closeBtn = document.querySelector(".close-btn");
    let currentInput = "";

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let value = this.innerText;

     
            if (value === "DEL") {
                return;
            }

            if (value === "=") {
                try {
        
                    currentInput = eval(currentInput.replace("x", "*").replace("÷", "/")).toString();
                } catch {
                    currentInput = "Error";
                }
            } else if (value === "MC") {
   
                currentInput = "";
            } else {
    
                currentInput += value;
            }
            display.innerText = currentInput;
            const sound = new Audio("click.mp3");
            sound.volume = 0.3;
            sound.play();
        });
    });


    document.querySelector(".supp-btn").addEventListener("click", function () {
        currentInput = currentInput.slice(0, -1);
        display.innerText = currentInput;
    });

    closeBtn.addEventListener("click", function () {
        fetch(`https://${window.GetParentResourceName()}/openCalcul`, { method: "POST" });
        document.querySelector(".calculette-container").style.display = "none";
    });

    function closeCalcul() {
        document.getElementById("menuContainer").style.display = "none";
        fetch(`https://${window.GetParentResourceName()}/closeCalcul`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });
    }

    window.addEventListener("message", function (event) {
        if (event.data.action === "openCalcul") {
            document.querySelector(".calculette-container").style.display = "block";
        }
    });
});
