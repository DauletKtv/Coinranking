import "../TimePeriodBrn/TimePeriodBtn.css";

export default function TimePeriodBtn(props) {
  console.log(props.text.active);
  return (
    <div
      onClick={(e) => {
        props.choose(props.text.active);
        props.setChoosed(e);
      }}
      className={props.choosedClass ? "active" : "notActive"}
    >
      {props.text.period}
    </div>
  );
}
