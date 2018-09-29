export default ({store}) => {
  if(!process.server){
    let deviceTypeFunc = (() => {
      let vw = window.innerWidth;
     // console.log(vw);
      if(vw <= 480)
        return 'mobile';
      if(vw <= 767)
        return 'mobile-small-tablets';
      if(vw <= 979)
        return 'tablets';
      if(vw <= 1099)
        return 'tablets-laptops';
      if(vw <= 1404)
        return 'laptops';
      else
        return 'large-desktop';
    });
    window.addEventListener(
        'load',
        () => {
          store.commit(
              'device/setDeviceType',
              deviceTypeFunc()
          )
        }
    );
    window.addEventListener(
        'resize',
        () => {
          store.commit(
              'device/setDeviceType',
              deviceTypeFunc()
          )
        }
    );
  }
};