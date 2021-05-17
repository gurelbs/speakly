import React, { useState, useEffect, useRef } from 'react';
import Blank from './../images/blank.png'
import Snake from './../images/snake.png'
import Food  from './../images/food.png'
import SnakeRecognition from './SnakeRecognition'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import CountUp from 'react-countup';

const SnakeBoard = () => {
    const [transcript, setTranscript] = useState('')
    const [score, setScore] = useState(0)
    const { interimTranscript, resetTranscript } = useSpeechRecognition()
      useEffect(() => {
        let id;
        if (interimTranscript !== ''){
            setTranscript(interimTranscript)
            id = setTimeout(() => resetTranscript(),300)
        }
        return () => clearInterval(id)
    },[interimTranscript])
const width=15;
const height=15;    
let initialRows = [];
for(let i=0; i<height; i++) {
    initialRows.push([]);
    for(let k=0; k<width; k++) {
        initialRows[i].push('blank');
    }
}
const randomPosition = () => {
    const position = {
        x: Math.floor(Math.random()*width),
        y: Math.floor(Math.random()*height)};
    return position;    
}

const [rows, setRows] = useState(initialRows);
const [snake, setSnake] = useState([{x:0,y:0},{x:1,y:0}]);
const [direction, setDirection] = useState('right');
const [food, setFood] = useState(randomPosition);

const controlWithVoice = direction => {
    switch (direction) {
        case 'ימינה':
            setDirection('left');
            break;
        case 'ימינה':
            setDirection('left');
            break;
        case 'שמאל':
            setDirection('right');
            break;
        case 'שמאלה':
            setDirection('right');
            break;
        case 'למעלה':
            setDirection('top');
            break;
        case 'למטה':
            setDirection('bottom');
            break;
        default:
            break;
    }
}
useEffect(() => {
    controlWithVoice(interimTranscript) 
},[interimTranscript])

const changeDirectionWithKeys = (e) => {
    var { keyCode } = e;
      switch(keyCode) {
        case 39:
                setDirection('left');
                break;
        case 38:
                setDirection('top');
                break;                   
        case 37:
              setDirection('right');
              break;
        case 40:
              setDirection('bottom');
              break;
        default:
            break;            
          }
    }
    
  document.addEventListener("keydown", changeDirectionWithKeys, false);

const displaySnake = () => {
    const newRows = initialRows;
    snake.forEach(cell => {
     newRows[cell.x][cell.y]='snake';
    })
    newRows[food.x][food.y]='food';
    setRows(newRows);
}


const moveSnake = () => {
    const newSnake = [];
    switch(direction) {
        case 'right':
            newSnake.push({x: snake[0].x, y: (snake[0].y + 1)%width})
            break;
        case 'left':
            newSnake.push({x: snake[0].x, y: (snake[0].y - 1 + width)%width})
            break;
        case 'top':
            newSnake.push({x: (snake[0].x - 1 + height)%height, y: snake[0].y})
            break;
        case 'bottom':
            newSnake.push({x: (snake[0].x + 1)%height, y: snake[0].y})
    }
        snake.forEach(cell => {
            newSnake.push(cell);
        })    
    if(snake[0].x === food.x && snake[0].y === food.y) {
        setFood(randomPosition);
        let randomWords = ["כל הכבוד!","איזה יופי","בְּתֵאָבוֹן!","יָפֶה!","נהדר"]
        let random = () => Math.floor( Math.random() * randomWords.length)
        speechSynthesis.speak(new SpeechSynthesisUtterance(randomWords[random()]))
        setScore(score => score + 10)
    }else {
        newSnake.pop();
    }
    setSnake(newSnake);
    displaySnake();
}


useInterval(moveSnake, 280);

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

const displayRows = rows.map((row,i) => 
    <li key={i}>
        {row.map(e => {
            switch(e) {
                case 'blank':
                   return <img className='board-piecs' src={Blank}/>
                case 'snake':
                   return <img className='board-piecs' style={{opacity:"0"}} src={Snake}/>
                case 'food':
                    return <img className='board-piecs' src={Food}/>      
                      }
                 })
        }
    </li>
    );

return (
    <div className='snake-board'>
        <div  className='snake-board-col big'>
            <h1><CountUp end={score} /></h1>
            <ul style={{width:'auto', padding:'0px',listStyleType: 'none'}} className='img500'>
            { displayRows }
            </ul>
        </div>
        <div className='snake-board-col'>
            <SnakeRecognition/>
            <p>ניתן לשחק עם החיצים, או באמצעות הפקודות: למעלה, למטה, ימינה, שמאלה</p>
        </div>
    </div>
)
}

export default SnakeBoard;