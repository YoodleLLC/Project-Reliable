
 function postData(url,body){
        const headers=new Headers();
        headers.append('Content-Type', 'application/json');
        const options={
            method: 'POST',
            credentials: 'include',
            headers,                         
            body 
        }

        const request=new Request(url,options);
        return  fetch(request)
    }

    function getData(url){
        const headers=new Headers();
        headers.append('Content-Type', 'application/json');
        const options={
            method: 'GET',
            credentials: 'include',
            headers,   
                                            
        }

        const request=new Request(url,options);
        return  fetch(request)
    }
    
    export default postData
