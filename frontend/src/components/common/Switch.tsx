 interface SwitchType {
    isOn:boolean,
    handleToggle:React.ChangeEventHandler,
    colorOne:string,
    colorTwo:string,
    id:string
 }
export default function Switch({ id,isOn, handleToggle, colorOne, colorTwo }:SwitchType) {
    return (
      <>
        <input
          checked={isOn}
          onChange={handleToggle}
          className="switch-checkbox "
          id={id}
          type="checkbox"
        />
        <label
          style={{ background: isOn ? colorOne : colorTwo }}
          className="switch-label"
          htmlFor={id}
        >
          <span className={`switch-button`} />
        </label>
      </>
    )
  };