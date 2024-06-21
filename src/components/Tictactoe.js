import React,{useState} from 'react'
import './Tictactoe.css'


export default function Tictactoe() {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [isXNext,setIsXNext] = useState(true)
    const [winner ,setWinner] = useState(null)

    const handleClick = (index)=>{
        if(board[index]||winner)return;
        const newBoard = [...board]
        newBoard[index] = isXNext ? 'X':'O'
        setBoard(newBoard)
        const win = checkwinner(newBoard)
        if(win){
            setWinner(win)
        }
        else if(!newBoard.includes(null)){
            setWinner('Draw')
        }
        else {
            setIsXNext(!isXNext)
        }
    }

    const checkwinner = (board)=>{
        const winningcases = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        for(let i=0;i<winningcases.length;i++){
            const [a,b,c] = winningcases[i]
            if(board[a] && board[a]===board[b]&&board[a]===board[c])
                return board[a]
        }

        return null
    }

    const renderCell = (index) => (
        <div className={board[index]==='X'?'cell xcell':'cell ocell'} onClick={()=>handleClick(index)}>{board[index]}</div>
    )
  return (
    <div className='tic-tac-toe'>
        <div className='board'>
        {board.map((_,index)=>renderCell(index))}
        </div>
        {winner && <div className='winner'>
            {winner==="Draw"?"Draw":"Winner: "+winner}
            <div style={{position:'absolute',bottom:'30px',fontSize:'1.2em'}}><i className='fa fa-refresh refresh-btn' onClick={()=>{window.location.reload()}}></i></div>
            </div>}
    </div>
  )
}
