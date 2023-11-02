import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss"

const CircleRating = ({ rating }) => {
  return (
    <div className="bg-white h-10 w-10 sm:h-12 sm:w-12 circleRating">
        <CircularProgressbar
            value={rating}
            maxValue={10}
            text={rating}
            styles={buildStyles({
                pathColor:
                    rating < 5 ? "red" : rating < 7 ? "orange" : "green",
            })}
        />
    </div>
  )
}

export default CircleRating