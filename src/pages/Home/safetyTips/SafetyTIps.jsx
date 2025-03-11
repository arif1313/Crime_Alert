import Title from "../../Shared/Tilte/Title"


const SafetyTIps = () => {
    const crime_prevention_tips = [
        {
          num:1,
          tip: "Lock your doors",
          description:
            "Residence hall room doors, office doors, and especially car doors. Most property crimes are crimes of opportunity. Take away the opportunity -- lower the chances of being the victim of a property crime.",
        },
        {
          num:2,
          tip: "List serial numbers/mark property",
          description:
            "You should keep a list of all serial numbers of all valuables (especially stereos, computers) in a safe place. Property without serial numbers should have a unique number or signature inscribed in an inconspicuous location.",
        },
        {
          num:3,
          tip: "Report promptly",
          description:
            "If you believe an item is stolen, report it to University Police immediately. There is a direct, inverse correlation between the time lapse in reporting a crime and the ability of the police to solve a crime.",
        },
        {
          num:4,
          tip: "Be cognizant of your surroundings",
          description:
            "Take mental notes. Know the location of building exits and emergency phones before you need them. Be aware of what is going on around you and report suspicious activity to the University Police immediately.",
        },
        {
          num:5,
          tip: "Don't talk to strangers",
          description: "Too often this grade school advice is forgotten.",
        },
        {
          num:6,
          tip: "Be a keen observer",
          description:
            "This takes practice, but will be worth the effort. Physical descriptors (height, weight, skin complexion, facial hair, etc.) as well as clothing and vehicle descriptions are invaluable to the University Police when incidents occur.",
        },
        {
          num:7,
          tip: "Stay in groups",
          description:
            "Walk out to the parking lots in groups. Or if you must walk alone, call the University Police for an escort if you feel uncomfortable.",
        },
        {
          num:8,
          tip: "Stay in public places",
          description:
            "Don't walk empty paths alone or stay late in a classroom or office after hours. If you must do so, call University Police to let them know.",
        },
        {
          num:9,
          tip: "Protect yourself",
          description:
            "Have your car keys in your hand before leaving the building. Carry a whistle key chain as a warning call and always have a small flashlight handy.",
        },
        {
          num:10,
          tip: "Protect others",
          description:
            "Keep a watchful eye out for students, staff, and faculty, and their property. Only with the cooperation of the entire campus community can crime be truly prevented to the fullest extent.",
        },
        {
          num:11,
          tip: "Leave a light and a radio or television on when away",
          description:
            "Purchasing an inexpensive timer will allow you to make your residence appear occupied, discouraging most burglars.",
        },
        {
          num:12,
          tip: "Leave a light and a radio or television on when away",
          description:
            "Purchasing an inexpensive timer will allow you to make your residence appear occupied, discouraging most burglars.",
        },
      ];
  return (

        <div className="my-12 container mx-auto">
    <Title title={"Crime Prevention Tips"} description={`Empowering communities with real-time crime alerts 
anonymous reporting and actionable safety insights.
Stay informed stay connected and take control
of your safety with tools designed to protect
you and your neighborhood`} />
    {/* <p>Although there are no guaranteed ways of preventing crime completely, the following are 11 simple things that students, staff, and faculty can do on the Old Westbury campus that may deter property and violent crime.</p> */}

    <div className="grid md:grid-cols-2 gap-6">
        {crime_prevention_tips.map((tip, index) => (
          <div key={index} className="p-4 rounded-lg ">
            <h3 className="font-semibold text-xl text-[#EF3F5A] ">{`${tip.num}. ${tip.tip}`}</h3>
            <p className="text-gray-600 text-lg">{tip.description}</p>
          </div>
        ))}
      </div>


    </div>
  )
}

export default SafetyTIps