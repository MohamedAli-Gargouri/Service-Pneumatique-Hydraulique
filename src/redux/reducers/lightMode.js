const LightReducer=(state="LightMode",action)=>
{
    switch(action.type){
        case "LIGHTMODE": return "LIGHTMODE";
        case "DARKMODE": return "DARKMODE";
        default: return "LIGHTMODE";
    }
}
export default LightReducer;