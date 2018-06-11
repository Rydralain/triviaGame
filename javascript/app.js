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

    },
    // game end function
    endGame : function(){

    },
    // question guess function
    guessAnswer : function(answer){
        // pause timer
        // check & respond to answer
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
