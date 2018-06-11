// object to control game stuff
var gameController = {
    // score var
    score : 0,
    // number missed var
    missed : 0,
    // timer object placeholder
    timerObject : {},
    // timer held time var
    timeHolder : 0,
    // setup function
    setupGame : function(){
        this.score = 0;
        this.missed = 0;
        $(".main-display-stuff").toggle()
    },
    // game end function
    endGame : function(){
        $("#messages").html('Click "Play" to begin!<br />'+
        '<button id="play" type="button" class="btn btn-primary text-white">PLAY</button>');
    },
    // question guess function
    guessAnswer : function(answer){
        // pause timer
        var correct = quizController.checkAnswer(answer);console.log(correct)
        // wait 2 seconds
        // request new question
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
    $("#top").text("Game loaded, initializing!");
    gameController.endGame();


    // all event listeners

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