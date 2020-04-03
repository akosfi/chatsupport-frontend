export const getServerUrl = () => {    
    if(process.env.NODE_ENV === 'production') {
        return process.env.VUE_APP_SERVER_URL;
    }
    else {
        return "http://localhost:3000";
    } 
}