
type BannerProps = {
    onUploadClick:any, //mudar depois
}




const HeroBanner = ({onUploadClick}: BannerProps) => {
  return (
    <section id="HeroBanner">
        <img src="graphics/images/HeroBanner.png"/>
        <button onClick={onUploadClick} id="OpenPopUp">
            <img src="graphics/svg/CloudUpload.svg"/>
            <span>UPLOAD .CSV</span>
        </button>
    </section>
  )
}

export default HeroBanner