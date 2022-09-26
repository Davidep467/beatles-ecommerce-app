import classes from "./ImageHover.module.css";
import { useState } from "react";

const ImageHover = (props) => {
  const [imgone, setImageone] = useState(true);
  const [imgtwo, setImagetwo] = useState(false);
  const [imgthree, setImagethree] = useState(false);
  const [imgModal, setImageModal] = useState(false);

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

  const openImageModal = () => {
    setImageModal(true);
    document.body.style.overflow = "hidden";
  };
  const closeImageModal = () => {
    setImageModal(false);
    document.body.style.overflow = "auto";
  };
  
  const butonehand = `${classes.buttongall} ${imgone && classes.butoneclass}`;
  const buttwohand = `${classes.buttongall} ${imgtwo && classes.buttwoclass}`;
  const butthreehand = `${classes.buttongall} ${imgthree && classes.butthreeclass}`;

  return (
    <div className={classes.hovercont}>
      {imgModal && (
        <div className={classes.modalcont}>
          <button className={classes.xbut} onClick={closeImageModal}>
            X
          </button>
          {imgone && (
            <img
              className={classes.enlargedimageitem}
              src={props.image}
              alt=""
            />
          )}
          {imgtwo && (
            <img
              className={classes.enlargedimageitem}
              src={props.ndimage}
              alt=""
            />
          )}
          {imgthree && (
            <img
              className={classes.enlargedimageitem}
              src={props.rdimage}
              alt=""
            />
          )}
        </div>
      )}

      <div>
        {imgone && (
          <img
            className={classes.imageitem}
            onClick={openImageModal}
            src={props.image}
            alt=""
          />
        )}
        {imgtwo && (
          <img
            className={classes.imageitem}
            onClick={openImageModal}
            src={props.ndimage}
            alt=""
          />
        )}
        {imgthree && (
          <img
            className={classes.imageitem}
            onClick={openImageModal}
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
          <button className={classes.ytbut} type="button" title="...if available :)">
         
            Listen on YouTube &#9654;
          </button>
        </a>
      </div>
      <p className={classes.descr}>{props.Description}</p>
    </div>
  );
};
export default ImageHover;
