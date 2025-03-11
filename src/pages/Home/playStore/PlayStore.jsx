import Title from "../../Shared/Tilte/Title";

const PlayStore = () => {
    return (
      <div className="my-12 container mx-auto" >
        <Title title={"Download Crime Alert Andrord App"} description={`Empowering communities with real-time crime alerts 
anonymous reporting and actionable safety insights.
Stay informed stay connected and take control
of your safety with tools designed to protect
you and your neighborhood`}></Title>
       <div className="flex justify-center py-12">
       <a 
          href="https://play.google.com/store/apps/details?id=com.yourapp.package" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
            alt="Get it on Google Play" 
            width="150"
          />
        </a>
       </div>
      </div>
    );
  };
  
  export default PlayStore;
  