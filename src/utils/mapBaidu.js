const { BMap, BMAP_STATUS_SUCCESS } = window;



export const getCityByBaidu = () => {
    return new Promise ((resolve, reject) => {
        const geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                resolve(r.address.city)
            }
            else {
                reject('获取失败');
            }        
        },{enableHighAccuracy: true})
    })
}