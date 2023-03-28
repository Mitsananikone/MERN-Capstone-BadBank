import React from 'react';

export function ATM(props) {
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt;
    }

    return (
       <div className={classes()} style={{maxWidth: "18rem"}}>
        <div className="card-header shadow" style={{color: "white"}}>{props.header}</div>
        <div className="card-body shadow glowing-border" >
          {props.title && (<h3 className="card-title">{props.title}<span className="card-balance">&emsp;{props.balance}</span></h3> )  }
          {/* {props.input && (<input type="input" className="form-control" id="submit">{props.input}</input>)} */}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
          {props.submit && (<Button id='Submit'>{props.status}</Button>)}
        </div>
      </div>      
    );
  }