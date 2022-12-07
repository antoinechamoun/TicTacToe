const gameBoard = (function GameBoard(){
    let gameBoardArray = ['', '', '', '', '', '', '', '', '']
    let choiceStr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'] 
    let isX = true
    let winner = ''
    let restartBtn = document.querySelector('.btn')
    let versusChoice = document.getElementById('versus')

    // Add event listener
    window.addEventListener('click', play)
    restartBtn.addEventListener('click', restart)
    versusChoice.addEventListener('click', change)

    function change(e){
        versusChoice.value = e.srcElement.value;
        restart()
    }

    // Play function
    function play(e){
        if(e.target.className.split(" ")[0] !== 'cell'){
        }else{
            let choice = e.target.id
            let idIndex = e.target.className
            let index = idIndex.split(" ")[1];
            
            let cellSelected = document.getElementById(`${choice}`)
            
            if(cellSelected.textContent !== ''){
                alert('Please select an empty cell')
            }else{
                if(isX){
                    cellSelected.textContent ='X'
                }else{
                    cellSelected.textContent='O'
                }
                gameBoardArray[index] = isX ? "X" : "O"
                isX=!isX
                if(versusChoice.value!=='1vs1'){
                    checkWin()
                    if(winner!==''){
                        restart()
                        return
                    }
                    computerPlay()
                }
            }
            checkWin()
            if(winner !== ''){
                restart()
            }
        }
    }

    // Check if there is a winner
    function checkWin(){
        if(gameBoardArray[0] === gameBoardArray[1] && gameBoardArray[1] === gameBoardArray[2] && gameBoardArray[1] !== ''||
        gameBoardArray[0] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[8] && gameBoardArray[4] !== ''||
        gameBoardArray[0] === gameBoardArray[3] && gameBoardArray[3] === gameBoardArray[6] && gameBoardArray[3] !== ''){
            winner = gameBoardArray[0]
        }else if(gameBoardArray[3] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[5] && gameBoardArray[4] !== ''||
        gameBoardArray[1] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[7] && gameBoardArray[4] !== ''||
        gameBoardArray[2] === gameBoardArray[4] && gameBoardArray[4] === gameBoardArray[6] && gameBoardArray[4] !== ''){
                    winner = gameBoardArray[4] 
        }else if(gameBoardArray[6] === gameBoardArray[7] && gameBoardArray[7] === gameBoardArray[8] && gameBoardArray[7] !== ''||
                 gameBoardArray[2] === gameBoardArray[5] && gameBoardArray[5] === gameBoardArray[8] && gameBoardArray[5] !== ''){
                    winner = gameBoardArray[8] 
        }else if(gameBoardArray[0] !== '' && gameBoardArray[1] !== '' && gameBoardArray[2] !== '' && gameBoardArray[3] !== '' && gameBoardArray[4] !== '' && gameBoardArray[5] !== '' && gameBoardArray[6] !== '' && gameBoardArray[7] !== '' && gameBoardArray[8] !== ''){
            winner='tie'
        }
        if(winner !== ''){
            if(winner === 'tie'){
                alert("No winner for this round! Tie!" ) 
            }else{
                alert(winner + " is the winner")
            }
        }

    }

    // Restart function
    function restart(){
        gameBoardArray = ['', '', '', '', '', '', '', '', '']
        isX = true
        winner = ''
        round=0
        for( cell of document.querySelectorAll(`.cell`)){
            cell.textContent=''
        }
    }

    // Computer play function
    function computerPlay(){
        let computerLevel = versusChoice.value.split("_")[1];
        let compChoice 
        do{
            compChoice = Math.floor(Math.random()*9)
            cellSelected = document.getElementById(`${choiceStr[compChoice]}`)
        }while(cellSelected.textContent!=='')
        console.log(cellSelected);
        if(computerLevel === 'medium'){
            if(checkLine(0,1,2)){
                compChoice=2
            }else if(checkLine(0,2,1)){
                compChoice=1
            }else if(checkLine(1,2,0)){
                compChoice=0
            }else if(checkLine(3,4,5)){
                compChoice=5
            }else if(checkLine(3,5,4)){
                compChoice=4
            }else if(checkLine(4,5,3)){
                compChoice=3
            }else if(checkLine(6,7,8)){
                compChoice=8
            }else if(checkLine(6,8,7)){
                compChoice=7
            }else if(checkLine(7,8,6)){
                compChoice=6
            }else if(checkLine(0,4,8)){
                compChoice=8
            }else if(checkLine(0,8,4)){
                compChoice=4
            }else if(checkLine(4,8,0)){
                compChoice=0
            }else if(checkLine(2,4,6)){
                compChoice=6
            }else if(checkLine(2,6,4)){
                compChoice=4
            }else if(checkLine(6,4,2)){
                compChoice=2
            }
        }else{
            
        }
        console.log(cellSelected);
        cellSelected.textContent='O';
        gameBoardArray[compChoice]='O';
        isX=true
    }

    function checkLine(ind0, ind1, ind2){
        if(gameBoardArray[ind0]===gameBoardArray[ind1] && gameBoardArray[ind1]!=='' && gameBoardArray[ind2]=== ''){
            cellSelected = document.getElementById(choiceStr[ind2])
            compChoice = ind2
            return true
        }
        return false
    }
})()