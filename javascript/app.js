// object to control game stuff
var gameController = {
    // score var
    score : 0,
    // number missed var
    missed : 0,
    // timer object placeholder
    timeRemaining: 0,
    // timer held time var
    timeRunning : false,
    // setup function
    setupGame : function(){
        this.correct = 0;
        this.total = 0;
        this.timeRemaining = 6;
        quizController.getNewQuestion();
    },
    // game end function
    endGame : function(){
        this.timeRunning = false;
        $("#messages").html('Click "Play" to begin!<br />'+
        '<button id="play" type="button" class="btn btn-primary text-white">PLAY</button>');
    },
    // question guess function
    guessAnswer : function(answer){
        // pause timer
        var correct = quizController.checkAnswer(answer);
        // wait 2 seconds
        // request new question
    },
    // process stuff every second
    runTick : function(){
        if(this.timeRunning === true){
            // stuff that happens when the timer is active

            // decrement timer & display
            this.timeRemaining--;
            $("#timer").text(this.timeRemaining);

            // check if time is out
            if(this.timeRemaining <= 0){
                // show endgame message
                $("#top").text("You got "+this.correct+" out of "+this.total+"!");
                // run endgame code
                this.endGame()
            }
        }
    },
    startTimer : function(){

    },
    stopTimer : function(){

    }
}

// quiz control object
var quizController = {
    // answer vars
    answers : [false, false, false, false],
    // Request new question
    getNewQuestion : function(){
        // unset correct answers
        this.answers = [false, false, false, false];
        // API request for new question
        var apiURL = "https://opentdb.com/api.php";
        var apiParams = {
        amount : 1,
        type : "multiple",
        difficulty : "easy"
        }

        $.ajax({
            url : apiURL,
            data : apiParams,
            dataType : "json",
            method : "GET"
        }).then(function(data){
            quizController.setNewQuestion(data.results[0]);
        });
    },
    // Set new question - AJAX callback
    setNewQuestion(response){
        // display options and set answer bools
        console.log(response);
    },
    // answer checker - this is just a getter for the answers array
    checkAnswer : function(answer){
        if(quizController.answers[answer] === true){
            return true;
        } else {
            return false;
        }
    }
    // 
}

$( document ).ready(function() {
    $("#top").text("Are you ready?");
    gameController.endGame();


    // all event listeners

    // global timer
    var timer = setInterval(function(){
        gameController.runTick();
    }, 1000);


    // start game when play button is clicked
    $("#play").on("click", function(){
        gameController.setupGame();
    })

    // select answers when clicked
    $(".answer-button").on("click", function(event){
        var clickedNum = $(this).attr("btn-num");
        gameController.guessAnswer(clickedNum);
    })
});