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
  
//   <>
//         <input
//           checked={isOn}
//           onChange={handleToggle}
//           className="h-0 w-0 invisible 
//           peer"
//           id={`switch`}
//           type="checkbox"
//         />
//         <label
//           style={{ background: isOn ? colorOne : colorTwo }}
//           className="flex item-center justify-around cursor-pointer w-[100px] h-[100px] bg-gray-500 rounded-lg relative transition-all duration-200 
//            peer-checked:[-translate-x[100%] left-[calc(100% - 2px)]]
//           peer
//           "  
//           htmlFor={`switch`}
//         >
//           <span className="
//                 content-['']
//                 absolute 
//                 top-1,
//                 left-1 
//                 w-20 
//                 h-20
//                 rounded-xl
//                 transition-all 
//                 duration-200
//                 bg-white
//                 shadow-[ 0 0 2px 0 rgba(10, 10, 10, 0.29)]
//               peer-[-translate-x[100%] left-[calc(100% - 2px)]]
//              peer-active:w-24"/>
//         </label>
//       </>