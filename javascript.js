let playing = false;
let score;
let action;
let timeRemaining;
let correctAnswer;
// we click on the start/reset button
document.getElementById("startReset").onclick =
    function(){
           // if we are playing
    if(playing == true){
        location.reload();//reload page
    }else{// if we are not playing
        
        //change mode to playing
        playing = true;
        
        //set score to zero
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;
        
        //show countdown box
        show("timeRemaining");
        timeRemaining = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        
        //hide game over box
        hide("gameOver");
        
        //change button text to reset
        document.getElementById("startReset").innerHTML = "Reset Game";
        
        // start countdown
        startCountdown();
        
        // generate a new question and answer
        generateQA();
    }
}
//clicking on an answer box
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
   //check if we are playing
    if(playing == true){//yes
        if(this.innerHTML == correctAnswer){
           //correct answer
            
            //increase score by 1
            score++;
            document.getElementById("scoreValue").innerHTML = score;
            
            // hide incorrect box and show correct box
            hide("incorrect");
            show("correct");
            setTimeout(function(){
                hide("correct");
            }, 1000);
            //generate new Q&A
            generateQA();
            
           }else{
               //hide correct answer and show incorrect box
               hide("correct");
            show("incorrect");
            setTimeout(function(){
                hide("incorrect");
            }, 1000); 
           }
       
       }
}
}


// start counter
function startCountdown(){
   action = setInterval(function(){
      timeRemaining -= 1; document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
       if(timeRemaining == 0){// game over sign
           stopCountdown();
           show("gameOver");
           document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your Score Is: " + score + ".</p>";
           //make the time remaining sign disappear
           hide("timeRemaining");
           hide("correct");
           hide("incorrect");
           playing = false;
           document.getElementById("startReset").innerHTML = "Start Game";
           
       }
   }, 1000); 
}
// stop counter
function stopCountdown(){
    clearInterval(action);
}
//hide an element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}
//show an element
function show(Id){
    document.getElementById(Id).style.display = "block";
}
// generate questions and multiple answers
function generateQA(){
    let x  = 1+ Math.round(11*Math.random());
    let y  = 1+ Math.round(11*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    let correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    //fill one box with the correct answer
    let answers = [correctAnswer];
    
    
    for(i=1; i<5; i++){
        if(i != correctPosition){
           let wrongAnswer;
           do{
               wrongAnswer = (1+ Math.round(11*Math.random()))*(1+ Math.round(11*Math.random()));
           }while(answers.indexOf(wrongAnswer)>-1);
            answers.push(wrongAnswer);
        
        
           //a wrong answer
            document.getElementById("box"+i).innerHTML = wrongAnswer;
        }
    }
    
}
