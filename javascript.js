const gameBoard = (function GameBoard(){
    let gameBoardArray = ['', '', '', '', '', '', '', '', '']
    let choiceStr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'] 
    let isX = true
    let winner = ''
    let restartBtn = document.querySelector('.btn')
    let versusChoice = document.getElementById('versus')
    let compChoice 
    let cellSelected

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
            
            cellSelected = document.getElementById(`${choice}`)
            
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
        do{
            compChoice = Math.floor(Math.random()*9)
            cellSelected = document.getElementById(`${choiceStr[compChoice]}`)
        }while(cellSelected.textContent!=='')
        if(computerLevel === 'medium'){
            checkMedium()
        }else{
            if(!checkAllWin()){
                if(!checkMedium()){
                    checkCorners()
                }
            }
        }
        
        cellSelected = document.getElementById(`${choiceStr[compChoice]}`)
        cellSelected.textContent='O';
        gameBoardArray[compChoice]='O';
        isX=true
    }

    // function that blocks player
    function checkLineBlock(ind0, ind1, ind2){
        if(gameBoardArray[ind0]===gameBoardArray[ind1] && gameBoardArray[ind1]!=='' && gameBoardArray[ind2]=== ''){
            cellSelected = document.getElementById(choiceStr[ind2])
            compChoice = ind2
            return true
        }
        return false
    }

    // function checks medium choice
    function checkMedium(){
        let result=false
        if(checkLineBlock(0,1,2)){
            compChoice=2
            result=true
        }else if(checkLineBlock(0,2,1)){
            compChoice=1
            result=true
        }else if(checkLineBlock(1,2,0)){
            compChoice=0
            result=true
        }else if(checkLineBlock(3,4,5)){
            compChoice=5
            result=true
        }else if(checkLineBlock(3,5,4)){
            compChoice=4
            result=true
        }else if(checkLineBlock(4,5,3)){
            compChoice=3
            result=true
        }else if(checkLineBlock(6,7,8)){
            compChoice=8
            result=true
        }else if(checkLineBlock(6,8,7)){
            compChoice=7
            result=true
        }else if(checkLineBlock(7,8,6)){
            compChoice=6
            result=true
        }else if(checkLineBlock(0,4,8)){
            compChoice=8
            result=true
        }else if(checkLineBlock(0,8,4)){
            compChoice=4
            result=true
        }else if(checkLineBlock(4,8,0)){
            compChoice=0
            result=true
        }else if(checkLineBlock(2,4,6)){
            compChoice=6
            result=true
        }else if(checkLineBlock(2,6,4)){
            compChoice=4
            result=true
        }else if(checkLineBlock(6,4,2)){
            compChoice=2
            result=true
        }else if(checkLineBlock(0,3,6)){
            compChoice=6
            result=true
        }else if(checkLineBlock(0,6,3)){
            compChoice=3
            result=true
        }else if(checkLineBlock(6,3,0)){
            compChoice=0
            result=true
        }else if(checkLineBlock(1,4,7)){
            compChoice=7
            result=true
        }else if(checkLineBlock(1,7,4)){
            compChoice=4
            result=true
        }else if(checkLineBlock(4,7,1)){
            compChoice=1
            result=true
        }else if(checkLineBlock(2,5,8)){
            compChoice=8
            result=true
        }else if(checkLineBlock(5,8,2)){
            compChoice=2
            result=true
        }else if(checkLineBlock(2,8,5)){
            compChoice=5
            result=true
        }
        return result
    }

    // function checks all winning line
    function checkAllWin(){
        let result = false
        if(checkLineWin(0,1,2)){
            compChoice=2
            result=true
        }else if(checkLineWin(0,2,1)){
            compChoice=1
            result=true
        }else if(checkLineWin(1,2,0)){
            compChoice=0
            result=true
        }else if(checkLineWin(3,4,5)){
            compChoice=5
            result=true
        }else if(checkLineWin(3,5,4)){
            compChoice=4
            result=true
        }else if(checkLineWin(4,5,3)){
            compChoice=3
            result=true
        }else if(checkLineWin(6,7,8)){
            compChoice=8
            result=true
        }else if(checkLineWin(6,8,7)){
            compChoice=7
            result=true
        }else if(checkLineWin(7,8,6)){
            compChoice=6
            result=true
        }else if(checkLineWin(0,4,8)){
            compChoice=8
            result=true
        }else if(checkLineWin(0,8,4)){
            compChoice=4
            result=true
        }else if(checkLineWin(4,8,0)){
            compChoice=0
            result=true
        }else if(checkLineWin(2,4,6)){
            compChoice=6
            result=true
        }else if(checkLineWin(2,6,4)){
            compChoice=4
            result=true
        }else if(checkLineWin(6,4,2)){
            compChoice=2
            result=true
        }else if(checkLineWin(0,3,6)){
            compChoice=6
            result=true
        }else if(checkLineWin(0,6,3)){
            compChoice=3
            result=true
        }else if(checkLineWin(6,3,0)){
            compChoice=0
            result=true
        }else if(checkLineWin(1,4,7)){
            compChoice=7
            result=true
        }else if(checkLineWin(1,7,4)){
            compChoice=4
            result=true
        }else if(checkLineWin(4,7,1)){
            compChoice=1
            result=true
        }else if(checkLineWin(2,5,8)){
            compChoice=8
            result=true
        }else if(checkLineWin(5,8,2)){
            compChoice=2
            result=true
        }else if(checkLineWin(2,8,5)){
            compChoice=5
            result=true
        }
        return result
    }

    // function checks for winning
    function checkLineWin(ind0, ind1, ind2){
        if(gameBoardArray[ind0]===gameBoardArray[ind1] && gameBoardArray[ind1]==='O' && gameBoardArray[ind2]=== ''){
            cellSelected = document.getElementById(choiceStr[ind2])
            compChoice = ind2
            return true
        }
        return false
    }

    // function check for empty corners
    function checkCorners(){
        let result = false
        if(gameBoardArray[4]===''){
            compChoice=4
            result=true
        }else if(gameBoardArray[0] === 'X' && gameBoardArray[8]===''){
            compChoice=8
            result=true
        }else if(gameBoardArray[2]==='X' && gameBoardArray[6]===''){
            compChoice=6
            result=true
        }else if(gameBoardArray[6]==='X' && gameBoardArray[2]===''){
            compChoice=2
            result=true
        }else if(gameBoardArray[8]==='X' && gameBoardArray[0]===''){
            compChoice=0
            result=true
        }else if(gameBoardArray[0] === gameBoardArray[8] && gameBoardArray[0]==='X'|| gameBoardArray[2] === gameBoardArray[6] && gameBoardArray[2]==='X'){
            if(gameBoardArray[1] === ''){
                compChoice=1
                result=true
            }else if(gameBoardArray[3] === ''){
                compChoice=3
                result=true
            }else if(gameBoardArray[7] === ''){
                compChoice=7
                result=true
            }else if(gameBoardArray[5] === ''){
                compChoice=5
                result=true
            }
        }else if(gameBoardArray[0]===''){
            compChoice=0
            result=true
        }else if(gameBoardArray[6]===''){
            compChoice=6
            result=true
        }else if(gameBoardArray[8]===''){
            compChoice=8
            result=true
        }else if(gameBoardArray[2]===''){
            compChoice=0
            result=true
        }
        return result
    }
})()