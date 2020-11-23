const reducer = (state = {instancedetails:{instances:[]},type:"USD"}, action) => {
    switch (action.type) {
     case "INSTANCES_RECEIVED":
          return { ...state,instancedetails:{ instances:action.data , loading: false }}
     case 'INSTANCES_LOADING':
           return  {...state,instancedetails:{ instances:[] , loading: true }}
     case "TOOGLE_TYPE":
            return {...state,type:state.type === "USD"?"INR":"USD"}
     case "INSTANCES_UPDATED":
            var instances =[...state.instancedetails.instances];
            instances = instances.map(item=>{
                if(item.id === action.data.id){
                    return action.data;
                }
                return item;
            });
        return { ...state,instancedetails:{ instances:instances , loading: false }}
     default: 
          return state;
    }
};
export default reducer;