import classes from "./MobileImageHover.module.css";
import { useState } from "react";

const MobileImageHover = (props) => {
  const [imgone, setImageone] = useState(true);
  const [imgtwo, setImagetwo] = useState(false);
  const [imgthree, setImagethree] = useState(false);
  

  const OneHandler = () => {
    setImageone(true);
    setImagetwo(false);
    setImagethree(false);
  };
  const TwoHandler = () => {
    setImageone(false);
    setImagetwo(true);
    setImagethree(false);
  };
  const ThreeHandler = () => {
    setImageone(false);
    setImagetwo(false);
    setImagethree(true);
  };

  
  const butonehand = `${classes.buttongall} ${imgone && classes.butoneclass}`;
  const buttwohand = `${classes.buttongall} ${imgtwo && classes.buttwoclass}`;
  const butthreehand = `${classes.buttongall} ${imgthree && classes.butthreeclass}`;

  return (
    <div className={classes.hovercont}>

      <div>
        {imgone && (
          <img
            className={classes.imageitem}
            src={props.image}
            alt=""
          />
        )}
        {imgtwo && (
          <img
            className={classes.imageitem}
            src={props.ndimage}
            alt=""
          />
        )}
        {imgthree && (
          <img
            className={classes.imageitem}
            src={props.rdimage}
            alt=""
          />
        )}
        <div className={classes.butcont}>
          <button className={butonehand} onClick={OneHandler} onMouseOver={OneHandler}>
            1
          </button>
          <button className={buttwohand} onClick={TwoHandler} onMouseOver={TwoHandler}>
            2
          </button>
          <button className={butthreehand} onClick={ThreeHandler} onMouseOver={ThreeHandler}>
            3
          </button>
        </div>
        <a href={props.Listen} target="_blank" rel="noreferrer">
          <button className={classes.ytbut} type="button">
         
            Listen on YouTube &#9654;
          </button>
        </a>
      </div>
      <p className={classes.descr}>{props.Description}</p>
      <div className={classes.tracklist}>
                  <h4>Tracklist</h4>
<p>{props.t1}</p> <p> {props.t2}</p> <p>{props.t3}</p> <p>{props.t4}</p> <p>{props.t5}</p> <p>{props.t6}</p> <p>{props.t7}</p>
<p>{props.t8}</p> <p>{props.t9}</p> <p>{props.t10}</p> <p>{props.t11}</p> <p>{props.t12}</p> <p>{props.t13}</p> <p>{props.t14}</p>
<p>{props.t15}</p> <p>{props.t16}</p> <p>{props.t17}</p> <p>{props.t18}</p> <p>{props.t19}</p> <p>{props.t20}</p> <p>{props.t21}</p>
<p>{props.t22}</p> <p>{props.t23}</p> <p>{props.t24}</p> <p>{props.t25}</p> <p>{props.t26}</p> <p>{props.t27}</p> <p>{props.t28}</p>
<p>{props.t29}</p> <p>{props.t30}</p>
                </div>
    </div>
  );
};
export default MobileImageHover;
