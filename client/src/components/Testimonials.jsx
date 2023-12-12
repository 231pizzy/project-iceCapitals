import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import james from "../assets/james.jpeg";
import el from "../assets/Elrio.jpeg";
import austin from "../assets/austin.jpeg";
import stella from "../assets/stella.jpeg";
import chal from "../assets/charlotte.jpeg";

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-3/4 m-auto bgbl">
      <div className="mt-20">
        <Slider {...settings}>
          {data.map((d) => (
            <div
              key={d.name}
              className="bg-white h-[450px] text-black rounded-xl"
            >
              <div className="h-56 bg-indigo-600 flex justify-center items-center rounded-t-xl">
                <img src={d.img} alt="" className="h-44 w-44 rounded-full" />
              </div>

              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <p className="text-xl font-semibold">{d.name}</p>
                <p className="text-center">{d.review}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

const data = [
  {
    name: `Emily S.`,
    img: stella,
    review: `IceCapitals has transformed my investment journey. Their professionalism and unwavering support have not only secured my financial future but have also provided incredible growth opportunities. Investing with them has been my best decision yet!`,
  },
  {
    name: `Sophia L.`,
    img: el,
    review: `I couldn't be happier with IceCapitals! Their expertise in the investment field is unmatched. The tailored approach they take with clients and their consistent success in navigating the markets make them stand out. They're simply the best!`,
  },
  {
    name: `David M.`,
    img: james,
    review: `Investing with IceCapitals has been an absolute game-changer! Their dedication to excellence and their savvy investment strategies have significantly amplified my financial portfolio. Their team's guidance and commitment to success truly make them the top choice for investments!`,
  },
  {
    name: `Robert F`,
    img: austin,
    review: `Investing with IceCapitals has exceeded my expectations in every way possible. Their commitment to achieving financial goals is unparalleled. Their insights, coupled with their dedication to client success, truly make them the premier investment firm. I'm thrilled with the returns!`,
  },
  {
    name: `Olivia H.`,
    img: chal,
    review: `IceCapitals' investment strategies are in a league of their own! Their innovative approaches and transparent communication have made them my go-to investment partner. I've seen incredible growth and security in my investments since joining forces with IceCapitals!`,
  },
];
