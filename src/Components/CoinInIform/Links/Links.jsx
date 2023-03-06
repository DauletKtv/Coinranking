export default function Links(props) {
  return (
    <div className=" border-y  border-y-neutral-50">
      <h5>{props.type}</h5>
      <a href={props.url} target="_blank">
        {props.name}
      </a>
    </div>
  );
}
