import { put, takeLatest, all, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchInstance(data) {
    yield put({type: "INSTANCES_LOADING"});
    try{
        var fetcheddata;
        yield axios.get("http://localhost:8080/api/instances").then((res)=>{
            fetcheddata = res.data.instances;
        });  
        yield put({ type: "INSTANCES_RECEIVED", data: fetcheddata });
    }catch (error){}
}
function* startInstance(action){
    try{
        var fetcheddata;
        yield axios.get("http://localhost:8080/api/instance/start/"+action.payload).then((res)=>{
            fetcheddata = res.data.updatedInstance;
        });  
        console.log(fetcheddata,"instances update");
        yield put({ type: "INSTANCES_UPDATED", data: fetcheddata });
    }catch (error){}
}
function* stopInstance(action){
    try{
        var fetcheddata;
        yield axios.get("http://localhost:8080/api/instance/stop/"+action.payload).then((res)=>{
            fetcheddata = res.data.updatedInstance;;
        });  
        yield put({ type: "INSTANCES_UPDATED", data: fetcheddata });
    }catch (error){}
}
function* actionWatcher() {
     yield takeLatest('GET_INSTANCES', fetchInstance);
     yield takeEvery('START_INSTANCE',startInstance);
     yield takeEvery('STOP_INSTANCE',stopInstance);
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}