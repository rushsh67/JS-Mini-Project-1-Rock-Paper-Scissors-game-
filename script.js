setTimeout(()=>{
    document.body.classList.remove('preload')
},500)

const CHOICES = [
    {
        name:'paper',
        beats:'rock'
    },
    {
        name:'scissors',
        beats:'paper'
    },
    {
        name:'rock',
        beats:'scissors'
    }
]
// DOM events modal
const userChoice = document.querySelectorAll('.choice-btn')
const gameDiv = document.querySelector('.game')
const resultsDiv = document.querySelector('.results')
const resultDivs = document.querySelectorAll('.results-result')

const resultsWinner = document.querySelector('.results-winner')
const resultsText = document.querySelector('.results-text')

const playAgain = document.querySelector('.play-again');
const refresh = document.querySelector('.reset')
const scoreNumber = document.querySelector('.score_number')

if(localStorage.getItem("score")==null)
    localStorage.setItem("score",0)
let score= localStorage.getItem("score");
scoreNumber.innerHTML = score

refresh.addEventListener('click', () => {
    localStorage.setItem("score",0)
    score= localStorage.getItem("score");
    scoreNumber.innerHTML = score
})


userChoice.forEach(button => {
    button.addEventListener('click',()=> {
        const choiceName = button.dataset.choice;
        const userChoice = CHOICES.find(choice => choice.name == choiceName);
        choose(userChoice);
    })
});

function choose(choice){
    const aiChoice = aiChoose()
    displayResults([choice,aiChoice])
    displayWinner([choice,aiChoice])
}

function aiChoose(){
    const rand = Math.floor(Math.random() * CHOICES.length)
    return CHOICES[rand]
}

function displayResults(choices){
    resultDivs.forEach((resultDiv, index) =>{
        setTimeout(()=>{
            resultDiv.innerHTML = `
            <div class="choice ${choices[index].name}">
                <img src = "images/icon-${choices[index].name}.svg" alt="${choices[index].name}" />
            </div>`;
        },500*index)
    });
    gameDiv.classList.toggle('hidden')
    resultsDiv.classList.toggle('hidden')
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins  = isWinner(results);
        const aiWins = isWinner(results.reverse())

        if(userWins){
            resultsText.innerHTML = "You Win"
            resultDivs[0].classList.toggle('winner')
            score++;
            localStorage.setItem("score",score)
            setTimeout(()=>{
                scoreNumber.innerHTML = score;
            },1000)
        }
        else if(aiWins){
            resultsText.innerHTML = "You Lose"
            resultDivs[1].classList.toggle('winner')
            score--;
            localStorage.setItem("score",score)
            setTimeout(()=>{
                scoreNumber.innerHTML = score;
            },1000)
            
        }else{
            resultsText.innerHTML = "Draw"
        }
    },500)
    
    resultsWinner.classList.toggle('hidden')
    resultsDiv.classList.toggle('show-winner')
}

function isWinner(results){
    return results[0].beats == results[1].name;
}

const btnRules = document.querySelector('.rules-btn')
const btnClose  = document.querySelector('.close-btn')
const modal = document.querySelector('.modal')

// Play Again button
playAgain.addEventListener('click', () => {
    setTimeout(() => {
        gameDiv.classList.toggle('hidden')
        resultsDiv.classList.toggle('hidden')

        resultDivs.forEach(div => {
            div.innerHTML = "";
            div.classList.remove('winner')
        })

        resultsText.innerHTML = ""

        resultsDiv.classList.toggle('show-winner')
        resultsWinner.classList.toggle('hidden')
    },500)
})

//rules modal js
btnRules.addEventListener('click', () => {
    modal.classList.toggle('show-modal')
});


// rules model close model
btnClose.addEventListener('click', () => {
    modal.classList.toggle('show-modal')
});