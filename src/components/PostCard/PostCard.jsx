

import Button from "../Button/Button.jsx";

export default function PostCard(props) {
    return (
        <div className="postCard">

            <img src={props.img} alt="Piuma" />

            <h3 className="postTitle">
                {props.title}
            </h3>
            <p className="postText">


                {props.desc}
            </p>

            <Button />

        </div>
    )
}