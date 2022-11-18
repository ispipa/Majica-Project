import React, { useState } from 'react'

const Timer = () => {

    // const [seconds, setSeconds] = useState(0);
    // const [minutes, setMinutes] = useState(0);

    // let date = new Date();
    // let minutesTimer = date.getMinutes();
    // let secondsTimer = date.getSeconds();

    // if(minutesTimer === 15) { 
    //     alert("Ha expirado el tiempo de reserva, por favor reserve nuevamente")
    // } else if (minutesTimer < 10){
    //     minutesTimer = '0' + minutesTimer
    // };

    // if(secondsTimer < 10) { secondsTimer = '0' + seconds};

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const deadline = new Date(Date.now());
    // console.log(deadline.getMinutes())
    // console.log(deadline.getSeconds())

  return (
    <div>
        <div>
            {}
        </div>
        Timer
    </div>
  )
}

export default Timer