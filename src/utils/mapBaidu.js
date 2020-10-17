const { BMap, BMAP_STATUS_SUCCESS } = window;


// 获取定位
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

// 添加地图
export const newBMap = (container, center) => {
    const map = new BMap.Map(container); 
    map.centerAndZoom(center, 12);
    setTimeout(() => {
        // 控件直接渲染，页面会发生错乱，所以将控件写如定时器解决问题
        map.addControl(new BMap.NavigationControl()); 
        map.addControl(new BMap.ScaleControl());
    }, 1000);
}